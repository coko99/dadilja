import type { ReactNode } from "react";

const control =
  "w-full rounded-2xl border border-[rgba(232,196,206,0.18)] bg-[rgba(48,24,36,0.55)] px-4 py-3.5 text-[16px] text-[#f6e8ec] outline-none transition placeholder:text-[#c9a9b2]/70 focus:border-[#e8a8b8]";

export function Field({
  label,
  name,
  error,
  required = true,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children?: ReactNode;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-2 block text-[13px] font-semibold tracking-wide text-brown">
        {label} {required ? <span className="text-accent">*</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-sm text-[#f0a0b4]">{error}</span> : null}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { invalid, className = "", ...rest } = props;
  return <input id={rest.name} className={`${control} min-h-12 ${invalid ? "border-[#f0a0b4]" : ""} ${className}`} {...rest} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return <textarea id={rest.name} className={`${control} min-h-32 resize-y ${className}`} {...rest} />;
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <select id={rest.name} className={`${control} min-h-12 ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function Consent({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 text-[14px] leading-relaxed text-muted">
        <input
          type="checkbox"
          name="privacy"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 size-5 shrink-0 accent-[#c97a8e]"
          required
        />
        <span>
          Saglasan/na sam sa{" "}
          <a href="/politika-privatnosti" className="font-semibold text-brown underline-offset-2 hover:underline">
            politikom privatnosti
          </a>
          . <span className="text-accent">*</span>
        </span>
      </label>
      {error ? <span className="mt-1.5 block text-sm text-[#f0a0b4]">{error}</span> : null}
    </div>
  );
}

export function FormStatus({
  status,
  success,
}: {
  status: "idle" | "loading" | "success" | "error";
  success: string;
}) {
  if (status === "success") {
    return (
      <p className="rounded-2xl bg-[rgba(74,42,56,0.65)] px-4 py-3 text-[15px] text-[#f6e8ec]" role="status">
        {success}
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="rounded-2xl bg-[rgba(120,40,60,0.35)] px-4 py-3 text-[15px] text-[#f0a0b4]" role="alert">
        Poruka trenutno nije poslata. Pokušajte ponovo za nekoliko trenutaka.
      </p>
    );
  }
  return null;
}

export const honeypotClass = "absolute -left-[9999px] h-0 w-0 overflow-hidden";
