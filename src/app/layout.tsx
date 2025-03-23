// app/layout.tsx
import { ThemeProvider } from "next-themes";
import "./globals.css"; // Import global styles
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "PostHub",
  description: "A platform for writers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class">
      {/* Wrap your layout components */}
      <html lang="en">
        <body>
          <ToastContainer /> {children}
          {/* Footer, or other layout components */}
        </body>
      </html>
    </ThemeProvider>
  );
}
