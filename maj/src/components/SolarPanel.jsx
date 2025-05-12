import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, SRGBColorSpace } from "three";
import { a } from "@react-spring/three";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import solarTextureSrc from "../assets/SolarPanel003_1K-PNG/SolarPanel003_1K-PNG_Color.png";

export default function SolarPanel({ tiltAngle }) {
  const groupRef = useRef(); // Use a ref for the whole panel+frame

  // Load solar panel texture
  const texture = useLoader(TextureLoader, solarTextureSrc);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3, 3); // Prevent texture stretching

  // Smooth tilt animation applied to the whole group
  useFrame(() => {
    if (groupRef.current) {
      // Clamp tilt angle between -90° (backward tilt) and 90° (forward tilt)
      const clampedTilt = Math.max(-60, Math.min(tiltAngle, 60));
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (clampedTilt * Math.PI) / 180,
        0.1
      );
    }
  });

  return (
    <>
      {/* Group containing both the panel and frame */}
      <a.group ref={groupRef} position={[0, 1.1, 0]}>
        {/* Solar Panel */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshPhysicalMaterial
            map={texture}
            metalness={0.6}
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Metallic Frame (Slightly larger than the panel) */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[3.2, 0.08, 2.2]} />
          <meshPhysicalMaterial color="gray" metalness={1} roughness={0.2} />
        </mesh>
      </a.group>

      {/* Support Pole (Does NOT tilt) */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
        <meshStandardMaterial color="silver" metalness={1} roughness={0.3} />
      </mesh>

      {/* Environment Lighting */}
      <Environment preset="city" />
    </>
  );
}
