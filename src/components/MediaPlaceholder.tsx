type Variant = "metal" | "paper";

export default function MediaPlaceholder({
  ratio = "4 / 5",
  label,
  variant = "metal",
  className = "",
}: {
  ratio?: string;
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <div
      data-cursor="media"
      className={`relative overflow-hidden rounded-md border ${
        variant === "metal" ? "border-hairline-dark" : "border-hairline"
      } ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className={`absolute inset-0 ${variant === "metal" ? "placeholder-metal" : "placeholder-paper"}`} />
      <span
        className={`absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.06em] ${
          variant === "metal" ? "text-white/70" : "text-lg-subtitle2"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
