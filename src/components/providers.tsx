import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 2500,
        refetchOnWindowFocus: true,
        retry: 1,
      },
    },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(makeClient);
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider delay={200}>
        {children}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
