import { Link, CloudSunIcon as SolarPanel } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-zinc-100 shadow h-[100px] w-full   ">
      <div className=" mx-auto px-4 h-full">
        <div className="flex items-center h-full">
          <div className="p-5 flex items-center align-middle mr-7">
            <SolarPanel className="h-12 w-12 mr-2" />
            <span className="font-bold text-3xl">SolarOptimize</span>
          </div>
          <nav className="flex gap-8 pl-30 py-4 text-xl  font-bold">
            <a href="#model-section" className="">
              Model
            </a>
            <a href="#dashboard-section" className="">
              Tabloo Dashboard
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
