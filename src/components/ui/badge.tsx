import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        muted: "bg-muted text-muted-foreground",
        doing: "bg-doing text-doing-foreground",
        warn: "bg-warn text-warn-foreground",
        outline: "shadow-border text-muted-foreground",
        paper: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
