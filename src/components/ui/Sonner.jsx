import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      closeButton
      theme="light"
      toastOptions={{
        style: {
          background: "white",
          color: "#FFA500", 
          border: "1px solid #e4e4e7",
          borderRadius: "12px",
          fontSize: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    />
  );
}