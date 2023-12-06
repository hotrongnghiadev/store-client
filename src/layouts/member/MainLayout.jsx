import { Outlet } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "memberSidebar",
    false,
  );
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-100  ">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          {/* outlet start */}
          <main className="flex w-full justify-center ">
            <div className="mt-4 w-full max-w-screen-xl px-2">
              <Outlet />
            </div>
          </main>
          {/* outlet end */}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
