import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-card text-card-foreground shadow-border border-0 font-sans",
          title: "text-foreground",
          description: "text-muted-foreground",
        },
      }}
    />
  );
}
