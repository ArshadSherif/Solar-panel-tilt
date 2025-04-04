import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTilt } from "@/context/TiltContext";

export default function PanelConfiguration() {
  const { tilt, setTilt } = useTilt();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [time, setTime] = useState("");


  const fetchTiltAngle = async () => {
    if (!latitude || !longitude) {
      alert("Please enter both latitude and longitude");
      return;
    }

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          latitude: parseFloat(latitude), 
          longitude: parseFloat(longitude)
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      setTilt(data.surface_tilt.toFixed(2)); // Update tilt angle
    } catch (error) {
      console.error("Error fetching tilt angle:", error);
      alert("Failed to fetch tilt angle. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Solar System Configuration</h2>

      <div className="space-y-6 mb-6">
        {/* Latitude Input */}
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            type="number"
            id="latitude"
            placeholder="Enter Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        {/* Longitude Input */}
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            type="number"
            id="longitude"
            placeholder="Enter Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>


        {/* Time Input */}
        <div className="space-y-2">
          <Label htmlFor="time">Time (hrs)</Label>
          <Input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>



        {/* Apply Button */}
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white"
          onClick={fetchTiltAngle}
        >
          Apply Settings
        </Button>
      </div>

      <hr className="h-3" />

      {/* Panel Configuration */}
      <h2 className="text-lg font-medium mb-4">Panel Configuration</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="panel-angle">Surface Tilt Prediction</Label>
          <div className="flex items-center gap-2">
            <Slider
              id="panel-angle"
              min={-60}
              max={60}
              step={1}
              value={[tilt]}
              onValueChange={(value) => setTilt(value[0])}
              className="flex-1"
            />
            <span className="w-12 text-right">{tilt}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
