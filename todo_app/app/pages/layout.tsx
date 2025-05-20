import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/navbar/Navbar";

export default function SecondLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="h-screen pt-2">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
