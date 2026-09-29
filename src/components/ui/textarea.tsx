import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-sm bg-secondary px-3 py-2 text-sm text-foreground shadow-border",
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
