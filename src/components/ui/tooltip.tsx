import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TooltipProvider({
  children,
  delay = 200,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>{children}</TooltipPrimitive.Provider>
  );
}

export function Tooltip({
  children,
  label,
  side = "top",
}: {
  children: ReactNode;
  label: ReactNode;
  side?: ComponentProps<typeof TooltipPrimitive.Content>["side"];
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            "z-50 rounded-sm bg-popover px-2 py-1 text-xs text-popover-foreground shadow-border",
            "origin-[var(--radix-tooltip-content-transform-origin)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98]",
          )}
        >
          {label}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
