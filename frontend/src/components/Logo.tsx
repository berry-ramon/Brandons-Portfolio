import { useState } from "react";

export function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span
        className={`grid shrink-0 place-items-center rounded-lg bg-foreground font-semibold text-background ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
      >
        BK
      </span>
    );
  }

  return (
    <img
      src="/assets/logo.png"
      alt="Brandon Kimathi"
      width={size}
      height={size}
      onError={() => setError(true)}
      className={`shrink-0 rounded-lg object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
