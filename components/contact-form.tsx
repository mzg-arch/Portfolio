"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type VisibleField = Exclude<keyof ContactFields, "website">;
type FieldErrors = Partial<Record<VisibleField, string>>;
type SubmissionStatus =
  | { type: "idle"; message: "" }
  | { type: "submitting"; message: "" }
  | { type: "success" | "error"; message: string };

const INITIAL_FIELDS: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VISIBLE_FIELDS: VisibleField[] = ["name", "email", "subject", "message"];

function validateFields(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();

  if (name.length < 2 || name.length > 80 || /[\r\n]/.test(name)) {
    errors.name = "Enter a name between 2 and 80 characters.";
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email) || /[\r\n]/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (subject.length < 3 || subject.length > 120 || /[\r\n]/.test(subject)) {
    errors.subject = "Enter a subject between 3 and 120 characters.";
  }

  if (message.length < 10 || message.length > 3000) {
    errors.message = "Enter a message between 10 and 3,000 characters.";
  }

  return errors;
}

function readServerErrors(value: unknown): FieldErrors {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const result: FieldErrors = {};
  const candidate = value as Record<string, unknown>;

  for (const field of VISIBLE_FIELDS) {
    const message = candidate[field];

    if (typeof message === "string") {
      result[field] = message;
    }
  }

  return result;
}

function focusFirstInvalidField(errors: FieldErrors) {
  const firstInvalidField = VISIBLE_FIELDS.find((field) => errors[field]);

  if (firstInvalidField) {
    document.getElementById(`contact-${firstInvalidField}`)?.focus();
  }
}

const inputClasses =
  "mt-2 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--foreground)] shadow-sm outline-none transition placeholder:text-[var(--muted)] hover:border-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:cursor-not-allowed disabled:bg-[var(--surface-subtle)]";

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1.5 text-sm text-red-700" id={id}>
      {message}
    </p>
  );
}

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>({
    type: "idle",
    message: "",
  });

  const isSubmitting = status.type === "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof ContactFields;
    const value = event.target.value;

    setFields((current) => ({ ...current, [field]: value }));

    if (field !== "website" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status.type === "success" || status.type === "error") {
      setStatus({ type: "idle", message: "" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const clientErrors = validateFields(fields);
    setErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      focusFirstInvalidField(clientErrors);
      return;
    }

    setStatus({ type: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data: unknown = await response.json().catch(() => null);
      const responseBody =
        data && typeof data === "object" && !Array.isArray(data)
          ? (data as Record<string, unknown>)
          : {};

      if (!response.ok) {
        const serverErrors = readServerErrors(responseBody.errors);
        setErrors(serverErrors);

        const message =
          typeof responseBody.message === "string"
            ? responseBody.message
            : "Your message could not be sent. Please try again.";

        setStatus({ type: "error", message });
        focusFirstInvalidField(serverErrors);
        return;
      }

      setFields(INITIAL_FIELDS);
      setErrors({});
      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "The message service is unavailable right now. Please try again or use the listed email address.",
      });
    }
  }

  return (
    <form
      aria-label="Contact form"
      className="surface-card space-y-5 p-5 sm:p-7"
      noValidate
      onSubmit={handleSubmit}
    >
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          onChange={handleChange}
          tabIndex={-1}
          type="text"
          value={fields.website}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-800" htmlFor="contact-name">
            Name
          </label>
          <input
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={inputClasses}
            disabled={isSubmitting}
            id="contact-name"
            maxLength={80}
            name="name"
            onChange={handleChange}
            required
            type="text"
            value={fields.name}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-800" htmlFor="contact-email">
            Email
          </label>
          <input
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={inputClasses}
            disabled={isSubmitting}
            id="contact-email"
            maxLength={254}
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={fields.email}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-800" htmlFor="contact-subject">
          Subject
        </label>
        <input
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          aria-invalid={Boolean(errors.subject)}
          className={inputClasses}
          disabled={isSubmitting}
          id="contact-subject"
          maxLength={120}
          name="subject"
          onChange={handleChange}
          required
          type="text"
          value={fields.subject}
        />
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-800" htmlFor="contact-message">
          Message
        </label>
        <textarea
          aria-describedby={
            errors.message
              ? "contact-message-help contact-message-error"
              : "contact-message-help"
          }
          aria-invalid={Boolean(errors.message)}
          className={`${inputClasses} min-h-36 resize-y`}
          disabled={isSubmitting}
          id="contact-message"
          maxLength={3000}
          name="message"
          onChange={handleChange}
          required
          rows={6}
          value={fields.message}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <FieldError id="contact-message-error" message={errors.message} />
          <p className="ml-auto text-xs text-slate-500" id="contact-message-help">
            {fields.message.length}/3,000
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>

        {status.type === "success" ? (
          <p
            aria-live="polite"
            className="text-sm font-medium text-[var(--accent-dark)]"
            role="status"
          >
            {status.message}
          </p>
        ) : null}

        {status.type === "error" ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default ContactForm;
