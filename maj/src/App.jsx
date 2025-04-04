import Navbar from "./components/Navbar";
import PanelConfiguration from "./components/PanelConfiguration";
import SolarPanelModel from "./components/SolarPanelModel";
import EnergyVisualization from "./components/EnergyVisuilization";
import { TiltProvider } from "./context/TiltContext";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TiltProvider>
        <Navbar />
        <main className="container mx-auto p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-white rounded-lg shadow">
              <PanelConfiguration />
            </div>
            <div className="md:col-span-2 bg-white rounded-lg shadow">
              <div className="p-4">
                <h2 className="text-xl font-medium mb-4">Interactive Model</h2>
                <div className="border rounded-lg overflow-hidden">
                  <SolarPanelModel />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <EnergyVisualization />
          </div>
        </main>
      </TiltProvider>
    </div>
  );
};

export default App;
