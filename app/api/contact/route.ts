import { NextResponse, type NextRequest } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type ContactField = Exclude<keyof ContactPayload, "website">;
type ValidationErrors = Partial<Record<ContactField, string>>;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_STORE_MAX_ENTRIES = 1_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_FIELDS = new Set<keyof ContactPayload>([
  "name",
  "email",
  "subject",
  "message",
  "website",
]);
const rateLimitStore = new Map<string, number[]>();

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers?: Record<string, string>,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsePayload(
  value: unknown,
): { success: true; payload: ContactPayload } | { success: false; message: string } {
  if (!isRecord(value)) {
    return { success: false, message: "Invalid request body." };
  }

  const keys = Object.keys(value);
  if (keys.some((key) => !ALLOWED_FIELDS.has(key as keyof ContactPayload))) {
    return { success: false, message: "Invalid request fields." };
  }

  const requiredFields: ContactField[] = ["name", "email", "subject", "message"];

  if (requiredFields.some((field) => typeof value[field] !== "string")) {
    return { success: false, message: "All contact fields are required." };
  }

  if (value.website !== undefined && typeof value.website !== "string") {
    return { success: false, message: "Invalid request fields." };
  }

  return {
    success: true,
    payload: {
      name: (value.name as string).trim(),
      email: (value.email as string).trim(),
      subject: (value.subject as string).trim(),
      message: (value.message as string).trim(),
      website: typeof value.website === "string" ? value.website.trim() : "",
    },
  };
}

function validatePayload(payload: ContactPayload): ValidationErrors {
  const errors: ValidationErrors = {};

  if (
    payload.name.length < 2 ||
    payload.name.length > 80 ||
    /[\r\n]/.test(payload.name)
  ) {
    errors.name = "Enter a name between 2 and 80 characters.";
  }

  if (
    payload.email.length > 254 ||
    !EMAIL_PATTERN.test(payload.email) ||
    /[\r\n]/.test(payload.email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (
    payload.subject.length < 3 ||
    payload.subject.length > 120 ||
    /[\r\n]/.test(payload.subject)
  ) {
    errors.subject = "Enter a subject between 3 and 120 characters.";
  }

  if (payload.message.length < 10 || payload.message.length > 3000) {
    errors.message = "Enter a message between 10 and 3,000 characters.";
  }

  return errors;
}

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return address.slice(0, 100);
}

function checkRateLimit(identifier: string) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recentRequests = (rateLimitStore.get(identifier) ?? []).filter(
    (timestamp) => timestamp > cutoff,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.max(
      1,
      Math.ceil((recentRequests[0] + RATE_LIMIT_WINDOW_MS - now) / 1000),
    );

    rateLimitStore.set(identifier, recentRequests);
    return { limited: true, retryAfter };
  }

  recentRequests.push(now);
  rateLimitStore.set(identifier, recentRequests);

  if (rateLimitStore.size > RATE_LIMIT_STORE_MAX_ENTRIES) {
    for (const [key, timestamps] of rateLimitStore) {
      const activeTimestamps = timestamps.filter((timestamp) => timestamp > cutoff);

      if (activeTimestamps.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, activeTimestamps);
      }
    }

    while (rateLimitStore.size > RATE_LIMIT_STORE_MAX_ENTRIES) {
      const oldestKey = rateLimitStore.keys().next().value as string | undefined;

      if (!oldestKey) {
        break;
      }

      rateLimitStore.delete(oldestKey);
    }
  }

  return { limited: false, retryAfter: 0 };
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHosts = new Set(
      [request.headers.get("host")?.trim(), forwardedHost, request.nextUrl.host].filter(
        (host): host is string => Boolean(host),
      ),
    );

    return (
      (originUrl.protocol === "http:" || originUrl.protocol === "https:") &&
      requestHosts.has(originUrl.host)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ message: "Request origin is not allowed." }, 403);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase();
  if (!contentType?.startsWith("application/json")) {
    return jsonResponse({ message: "Content-Type must be application/json." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ message: "Request body is too large." }, 413);
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ message: "The request body could not be read." }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ message: "Request body is too large." }, 413);
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return jsonResponse({ message: "Invalid JSON request body." }, 400);
  }

  const parsed = parsePayload(body);
  if (!parsed.success) {
    return jsonResponse({ message: parsed.message }, 400);
  }

  const { payload } = parsed;

  // Silently accept likely bot submissions so the honeypot is not discoverable.
  if (payload.website) {
    return jsonResponse(
      { message: "Thanks for reaching out. Your message has been sent." },
      200,
    );
  }

  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return jsonResponse(
      {
        message: "Please correct the highlighted fields and try again.",
        errors,
      },
      400,
    );
  }

  const rateLimit = checkRateLimit(getClientIdentifier(request));
  if (rateLimit.limited) {
    return jsonResponse(
      { message: "Too many messages were sent. Please try again later." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact form email environment variables are not configured.");
    return jsonResponse(
      {
        message:
          "The message service is not configured yet. Please use the direct email address instead.",
      },
      503,
    );
  }

  const emailText = [
    "New message from the portfolio contact form",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `Portfolio message: ${payload.subject}`,
        text: emailText,
        reply_to: payload.email,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!resendResponse.ok) {
      console.error(`Contact form email provider returned ${resendResponse.status}.`);
      return jsonResponse(
        {
          message:
            "Your message could not be sent right now. Please try again or use the direct email address.",
        },
        502,
      );
    }
  } catch {
    console.error("Contact form email request failed.");
    return jsonResponse(
      {
        message:
          "The message service is unavailable right now. Please try again or use the direct email address.",
      },
      502,
    );
  }

  return jsonResponse(
    { message: "Thanks for reaching out. Your message has been sent." },
    200,
  );
}
