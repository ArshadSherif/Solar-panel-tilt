import { useState } from "react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import { useTilt } from "@/context/TiltContext";

export default function PanelConfiguration() {
  
  const { tilt, setTilt } = useTilt();
  // const [panelAngle, setPanelAngle] = useState(30);
  const [environmentalFactor, setEnvironmentalFactor] = useState(0.8);
  const [sunlightExposure, setSunlightExposure] = useState(6);



  const handleApplySettings = () => {
    console.log("Settings applied:", { tilt, environmentalFactor, sunlightExposure });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Panel Configuration</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="panel-angle">Panel Angle</Label>
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
            <span className="w-12 text-right">{environmentalFactor.toFixed(2)}</span>
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

        <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={handleApplySettings}>
          Apply Settings
        </Button>
      </div>
    </div>
  );
}
