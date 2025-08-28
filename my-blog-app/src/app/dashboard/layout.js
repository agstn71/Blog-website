import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex pt-5 relative">
      
      <div className="sticky top-4">
        <Sidebar />
      </div>
      <div className="flex-1 max-h-screen overflow-y-scroll">{children}</div>
    </div>
  );
}
