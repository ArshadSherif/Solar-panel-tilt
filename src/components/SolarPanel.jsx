import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, SRGBColorSpace } from "three";
import { a } from "@react-spring/three"; // For smooth animations
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import solarTextureSrc from "../assets/SolarPanel003_1K-PNG/SolarPanel003_1K-PNG_Color.png";

export default function SolarPanel({ tiltAngle }) {
  const panelRef = useRef();

  // Load a realistic solar panel texture
  const texture = useLoader(TextureLoader, solarTextureSrc);
  texture.colorSpace = SRGBColorSpace; // Ensure proper color rendering
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3, 3); // Adjust tiling to fix stretching

  // Smoothly animate the tilt
  useFrame(() => {
    if (panelRef.current) {
      panelRef.current.rotation.x = THREE.MathUtils.lerp(
        panelRef.current.rotation.x,
        (tiltAngle * Math.PI) / 180, // Convert degrees to radians
        0.1 // Smooth transition speed
      );
    }
  });

  return (
    <>
      {/* Solar Panel */}
      <a.mesh ref={panelRef} position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshPhysicalMaterial
          map={texture}
          metalness={0.6}
          roughness={0.3}
          clearcoat={1} // Adds a glassy shine effect
          clearcoatRoughness={0.1}
        />
      </a.mesh>

      {/* Metallic Frame */}
      <mesh position={[0, 1, 0]} >
        <boxGeometry args={[3.2, 0.08, 2.2]} />
        <meshPhysicalMaterial color="gray" metalness={1} roughness={0.2} />
      </mesh>

      {/* Support Pole */}
      <mesh position={[0, 0.5, 0]} >
        <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
        <meshStandardMaterial color="silver" metalness={1} roughness={0.3} />
      </mesh>

      {/* Environment Lighting */}
      <Environment preset="city" />
    </>
  );
}
