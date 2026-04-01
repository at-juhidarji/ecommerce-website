  import { Toaster as Sonner } from "sonner";

  export function Toaster() {
    return (
      <Sonner
        position="top-center"
        richColors
        closeButton
        toastOptions={{className:
            "bg-white text-black border rounded-xl shadow-lg",
        }}
      />
    );
  }