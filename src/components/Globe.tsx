import React, { useMemo } from "react";
import { Line, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import solar from "../assets/solar.png";

const Shape: React.FC = () => {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 1, 0.5, 0, Math.PI * 2, false, 0).getPoints(
        50
      ),
    []
  );
  return (
    <group>
      <Line worldUnits points={points} color="#cae6f1" lineWidth={0} />
      <Line
        worldUnits
        points={points}
        color="#cae6f1"
        lineWidth={0}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="#cae6f1"
        lineWidth={0}
        rotation={[0, 0, -1]}
      />
      <Sphere args={[0.65, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
      <mesh position={[0, 0, 0]} scale={[4, 4, 4]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load(solar)}
          side={THREE.DoubleSide}
          transparent={true}
          alphaTest={0.5}
        />
      </mesh>
    </group>
  );
};

const Globe: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Shape />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </>
  );
};

export default Globe;
