import "@/styles/global.css";
import Sidebar from "@/components/Sidebar";
import clsx from "clsx";
import GlassPane from "@/components/BackgroundPane";

export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen ukraine-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          <Sidebar />
          <main className="w-full pl-6 h-full">{children}</main>
        </GlassPane>
        <div id="modal" />
      </body>
    </html>
  );
}
