import Sidebar from "@/components/Sidebar";

export const metadata = { title: "Dashboard | Vitae" };

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
