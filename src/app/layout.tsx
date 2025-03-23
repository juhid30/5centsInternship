import "./globals.css";
import ClientNavbar from "./components/ClientNavbar"; // Import the Client Navbar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar /> {/* Conditionally renders Navbar */}
        {children}
      </body>
    </html>
  );
}
