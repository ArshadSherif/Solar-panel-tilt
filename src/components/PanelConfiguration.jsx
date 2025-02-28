import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTilt } from "@/context/TiltContext";

export default function PanelConfiguration() {
  const { tilt, setTilt } = useTilt();
  const [environmentalFactor, setEnvironmentalFactor] = useState(0.8);
  const [sunlightExposure, setSunlightExposure] = useState(6);
  const [DNI, setDNI] = useState("");
  const [time, setTime] = useState("");
  const [GHI, setGHI] = useState("");

  const handleApplySettings = () => {
    console.log("Settings applied:", {
      DNI,
      time,
      GHI,
    });
    randomizeTilt();
  };

  // Function to generate a random value and update tilt
  const randomizeTilt = () => {
    // Generate a random number between -10 and 50, rounded to 4 decimal places
    const randomValue = Number((Math.random() * 60 - 10).toFixed(4));

    // Normalize value to the panel tilt range (0 - 90°)
    const mappedTilt = Math.min(90, Math.max(0, randomValue));

    // Console log the generated value
    console.log(`Generated Value: ${randomValue}, Mapped Tilt: ${mappedTilt}`);

    // Update tilt using context
    setTilt(mappedTilt);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Solar System Configuration</h2>

      {/* Custom Inputs Section */}
      <div className="space-y-6 mb-6">
        {/* System Name Input */}
        <div className="space-y-2">
          <Label htmlFor="system-name">Direct Normal Irradiance</Label>
          <Input
            type={"number"}
            id="Direct Normal Irradiance"
            placeholder="Direct Normal Irradiance"
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
          />
        </div>

        {/* Efficiency Input */}
        <div className="space-y-2">
          <Label htmlFor="To">Time (hrs)</Label>
          <div className="flex items-center gap-2">
            <Input
              type={"time"}
              id="Time"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        {/* Clear Sky GHI */}

        <div className="space-y-2">
          <Label htmlFor="Clear Sky Globar Horizontal Irradiance">
            Clear Sky Globar Horizontal Irradiance
          </Label>
          <div className="flex items-center gap-2">
            <Input
            type="number"
              id="GHI"
              placeholder="Clear Sky Globar Horizontal Irradiance"
              value={GHI}
              onChange={(e) => setGHI(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white"
          onClick={handleApplySettings}
        >
          Apply Settings
        </Button>
      </div>

      <hr className="h-3" />

      {/* Panel Configuration Section */}
      <h2 className="text-lg font-medium mb-4">Panel Configuration</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="panel-angle">Surface Tilt Prediction</Label>
          <div className="flex items-center gap-2">
            <Slider
              id="panel-angle"
              min={0}
              max={90}
              step={1}
              value={[tilt]}
              onValueChange={(value) => setTilt(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-right">{tilt}°</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="environmental-factor">Environmental Factor</Label>
          <div className="flex items-center gap-2">
            <Slider
              id="environmental-factor"
              min={0}
              max={1}
              step={0.01}
              value={[environmentalFactor]}
              onValueChange={(value) => setEnvironmentalFactor(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-right">
              {environmentalFactor.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sunlight-exposure">Sunlight Exposure</Label>
          <div className="flex items-center gap-2">
            <Slider
              id="sunlight-exposure"
              min={0}
              max={12}
              step={0.5}
              value={[sunlightExposure]}
              onValueChange={(value) => setSunlightExposure(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-right">{sunlightExposure}h</span>
          </div>
        </div>

        {/* <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={handleApplySettings}>
          Apply Settings
        </Button> */}
      </div>
    </div>
  );
}
