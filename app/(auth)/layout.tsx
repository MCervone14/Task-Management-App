import "@/styles/global.css";
import BackgroundPane from "@/components/BackgroundPane";

export const metadata = {
  title: "Tasks App",
  description: "An app to manage your tasks",
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen  ukraine-mesh p-6">
        <BackgroundPane className="w-full h-full flex items-center justify-center">
          {children}
        </BackgroundPane>
      </body>
    </html>
  );
}
