import { PerspectiveCamera, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import MoonTextureImg from "/img/Moon.png";

type MoonsProps = {
  moonRotation: number;
  isCameraRotation: boolean;
  moonPosition: THREE.Vector3;
};
const Moons = (props: MoonsProps) => {
  const moonGroupRef = useRef<THREE.Group>(null);
  const moonTexture = useTexture(MoonTextureImg);

  useEffect(() => {
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y = props.moonRotation;
    }
  }, [props.moonRotation]);

  return (
    <group position={[0, 0, 0]} ref={moonGroupRef}>
      {/* if isCameraRotation is set to true, render this camera here (which makes it rotate together with the whole group), will be used in the popup view */}
      {props.isCameraRotation && (
        <PerspectiveCamera
          makeDefault
          position={[2, 0, 0]}
          rotation={new THREE.Euler(0, Math.PI / 2, 0)}
          fov={25}
        />
      )}

      <mesh position={props.moonPosition} receiveShadow>
        <sphereGeometry args={[1, 64]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
    </group>
  );
};

export default Moons;
