import QueryProvider from "@/components/QueryProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
