import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import SolarPanel from "./SolarPanel";
import { useTilt } from "@/context/TiltContext";

export default function Scene() {
    const { tilt, setTilt } = useTilt();

  return (
    <>
      <Canvas camera={{ position: [5, 3, 5] , fov:40}}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* 3D Solar Panel */}
        <SolarPanel tiltAngle={tilt} />

        {/* Camera Controls */}
        <OrbitControls />
      </Canvas>
    </>
  );
}
