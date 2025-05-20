import { AuthProvider } from "@/components/context/auth";
import { MetricsProvider } from "@/components/context/metrics";
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
        <QueryProvider>
          <AuthProvider>
            <MetricsProvider>{children}</MetricsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
