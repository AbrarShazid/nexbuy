import Sidebar from "./components/Sidebar";





export const metadata = {
  title: "NexBuy | Dashboard",
  description: "Dashboard of NexBuy",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-[#6b7282]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto mt-16 md:mt-0">
        <div className="bg-white dark:bg-[#818792] rounded-xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

