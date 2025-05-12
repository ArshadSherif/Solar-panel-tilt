import Navbar from "./components/Navbar";
import PanelConfiguration from "./components/PanelConfiguration";
import SolarPanelModel from "./components/SolarPanelModel";
import EnergyVisualization from "./components/EnergyVisuilization";
import { TiltProvider } from "./context/TiltContext";

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-800 ">
      <TiltProvider>
        {/* Navbar stays at top */}
        <Navbar />

        <div className="bg-zinc-200 py-8 shadow-inner h-[845px] relative">
          {/* Background Image with Light Black Opacity */}
          <div className="absolute inset-0 bg-cover bg-center opacity-500">
            <div className="relative h-[845px]">
              {/* Image */}
              <img
                src="/src/assets/WhatsApp Image 2025-05-12 at 03.12.00_dcee2104.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 text-left flex flex-col items-start justify-center h-full relative z-10">
            <h1 className="text-8xl font-bold text-gray-300 ">
              Solar Tilt Optimizer
            </h1>
            <p className="mt-2 text-5xl text-gray-300">
              Maximize your energy with the perfect panel tilt.
            </p>
          </div>
        </div>

        {/* Main Content */}

        <main
          className="container mx-auto p-4 space-y-6 mt-10 mb-20 "
          id="model-section"
        >
          <div className="flex flex-col items-center justify-center h-[100px] ">
            <h2 className="text-4xl font-semibold">Interactive Model</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Interactive Model Panel - Larger and on the Left */}
            <div className="md:col-span-8 bg-white rounded-xl shadow-sm p-4 h-[700px] flex flex-col">
              {/* <h2 className="text-2xl font-semibold mb-4">Interactive Model</h2> */}
              <div className="border border-zinc-300 rounded-lg overflow-hidden flex-grow">
                <SolarPanelModel />
              </div>
            </div>

            {/* Configuration Panel - Smaller and on the Right */}

            <div className="md:col-span-4 flex items-center">
              <div className="w-full backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-6 shadow-lg">
                <PanelConfiguration />
              </div>
            </div>
          </div>
        </main>

        {/* Tabloo Visualization */}
        <div
          className="bg-zinc-200 py-8 shadow-inner h-[1000px]"
          id="dashboard-section"
        >
          <div className="flex items-center justify-center h-[50px] mb-20">
            <h2 className="text-4xl font-semibold">Tabloo Dashboard</h2>
          </div>

          <div className="flex w-full h-screen px-1">
            {/* Left: Model Viewer */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-[900px]">
                <EnergyVisualization />
              </div>
            </div>

            {/* Right: Description */}
            <div className="w-[40%] flex items-center justify-center mb-80 text-center">
              <div className="p-5 text-gray-800 text-sm leading-relaxed">
                <h2 className="text-3xl font-semibold mb-3">
                  Maximize Your Solar Energy Output with the Perfect Tilt
                </h2>
                <p className="text-2xl">
                  Unlock the full power of your solar panels by finding the
                  optimal tilt angle for your location and season. Our
                  interactive simulator empowers you to visualize how adjusting
                  the tilt impacts energy generation, helping you fine-tune your
                  setup for peak efficiency. Explore seasonal variations,
                  compare tilt angles, and maximize your solar gains
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-gray-500 text-white py-6 mt-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="mb-4 md:mb-0">
              © {new Date().getFullYear()} SolarTilt. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:underline hover:text-yellow-400">
                About
              </a>
              <a href="#" className="hover:underline hover:text-yellow-400">
                Contact
              </a>
              <a href="#" className="hover:underline hover:text-yellow-400">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </TiltProvider>
    </div>
  );
};

export default App;
