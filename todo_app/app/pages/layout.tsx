import Navbar from "@/components/navbar/Navbar";

export default function SecondLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen">
      <Navbar />
      {children}
    </div>
  );
}
