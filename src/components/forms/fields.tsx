import type { ReactNode } from "react";

const control =
  "w-full rounded-2xl border border-[rgba(82,33,16,0.12)] bg-ivory px-4 py-3.5 text-[16px] text-ink outline-none transition placeholder:text-muted/70 focus:border-brown";

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
      {error ? <span className="mt-1.5 block text-sm text-[#9d2348]">{error}</span> : null}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { invalid, className = "", ...rest } = props;
  return <input id={rest.name} className={`${control} min-h-12 ${invalid ? "border-[#9d2348]" : ""} ${className}`} {...rest} />;
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
          className="mt-1 size-5 shrink-0 accent-[#522110]"
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
      {error ? <span className="mt-1.5 block text-sm text-[#9d2348]">{error}</span> : null}
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
      <p className="rounded-2xl bg-blush-light px-4 py-3 text-[15px] text-brown" role="status">
        {success}
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="rounded-2xl bg-[#fff1f4] px-4 py-3 text-[15px] text-[#9d2348]" role="alert">
        Poruka trenutno nije poslata. Pokušajte ponovo za nekoliko trenutaka.
      </p>
    );
  }
  return null;
}

export const honeypotClass = "absolute -left-[9999px] h-0 w-0 overflow-hidden";
