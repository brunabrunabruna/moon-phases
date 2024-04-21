import React from "react";
import { MeshStandardMaterial } from "three";

const Moons = () => {
  return (
    <>
      <mesh position={[-4, 0, 0]} receiveShadow>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[-3, 0, -3]} receiveShadow>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[3, 0, 3]}>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0, -4]}>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[-3, 0, 3]}>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[0, 0, 4]}>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[3, 0, -3]}>
        <sphereGeometry args={[1, 16]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Moons;
