import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export function CellInput({
  value,
  placeholder,
  className,
  align = "left",
  onCommit,
  onEmptyDelete,
}: {
  value: string;
  placeholder?: string;
  className?: string;
  align?: "left" | "right" | "center";
  onCommit: (next: string) => void;
  onEmptyDelete?: () => void;
}) {
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = () => {
    const next = draft;
    if (next === value) return;
    if (!next.trim() && onEmptyDelete && !value.trim()) {
      onEmptyDelete();
      return;
    }
    onCommit(next);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === "Escape") {
      setDraft(value);
      ref.current?.blur();
    }
  };

  return (
    <input
      ref={ref}
      value={draft}
      placeholder={placeholder}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={onKeyDown}
      className={cn(
        "h-8 w-full min-w-0 bg-transparent px-1.5 text-sm text-foreground outline-none",
        "placeholder:text-muted-foreground/50",
        "rounded-xs transition-[background-color,box-shadow] duration-150",
        "hover:bg-accent/60 focus:bg-background focus:ring-1 focus:ring-ring",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    />
  );
}
