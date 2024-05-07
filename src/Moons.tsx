import { DragControls, useTexture } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Euler } from "three";
import * as THREE from "three";
import MoonTexture from "/img/Moon.png";

type MoonsProps = {
  moonRotation: number;
};
const Moons = (props: MoonsProps) => {
  const moonGroupRef = useRef<THREE.Group>(null);
  const moonTexture1 = useTexture(MoonTexture);

  //moon rotation animation
  // useFrame(() => {
  //   if (moonGroupRef.current) {
  //     moonGroupRef.current.rotation.y += 0.001;
  //   }
  // });

  useEffect(() => {
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y = props.moonRotation;
    }
  }, [props.moonRotation]);

  return (
    <group
      position={[0, 0, 0]}
      ref={moonGroupRef}
      // rotation={new Euler(0, Math.PI / 1, 0)}
      // rotateY={moonRotation}
    >
      <mesh position={[-4, 0, 0]} receiveShadow>
        <sphereGeometry args={[1, 32]} />
        <meshStandardMaterial map={moonTexture1} />
      </mesh>
    </group>
  );
};

export default Moons;
