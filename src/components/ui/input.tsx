import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-sm bg-secondary px-3 text-sm text-foreground shadow-border",
        "placeholder:text-muted-foreground/70",
        "transition-[box-shadow] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
