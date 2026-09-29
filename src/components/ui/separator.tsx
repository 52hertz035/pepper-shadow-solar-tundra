import { cn } from "@/lib/utils";

export function Separator({ className, vertical }: { className?: string; vertical?: boolean }) {
  return (
    <div
      role="separator"
      className={cn(
        "shrink-0 bg-border",
        vertical ? "w-px self-stretch" : "h-px w-full",
        className,
      )}
    />
  );
}
