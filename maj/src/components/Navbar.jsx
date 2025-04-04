
import { Link, CloudSunIcon as SolarPanel } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SolarPanel className="h-8 w-8 mr-2" /> 
            <span className="font-bold text-xl">SolarOptimize</span>
          </div>
          <nav className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/simulation" className="px-3 py-2 text-gray-700 hover:text-gray-900">
              Simulation Tool
            </Link>
            <Link href="/ml-integration" className="px-3 py-2 text-gray-700 hover:text-gray-900">
              ML Integration
            </Link>
          </nav>
        </div>
      </div>  
    </header>
  )
}

