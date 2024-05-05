import { DragControls, useTexture } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Euler } from "three";
import * as THREE from "three";
import MoonTexture from "/img/Moon.png";

type DragControlsProps = {
  /** If autoTransform is true, automatically apply the local transform on drag, true */
  autoTransform?: boolean;
  /** The matrix to control */
  matrix?: THREE.Matrix4;
  /** Lock the drag to a specific axis */
  axisLock?: "x" | "y" | "z";
  /** Limits */
  dragLimits?: [
    [number, number] | undefined,
    [number, number] | undefined,
    [number, number] | undefined
  ];
  /** Hover event */
  onHover?: (hovering: boolean) => void;
  /** Drag start event */
  onDragStart?: (origin: THREE.Vector3) => void;
  /** Drag event */
  onDrag?: (
    localMatrix: THREE.Matrix4,
    deltaLocalMatrix: THREE.Matrix4,
    worldMatrix: THREE.Matrix4,
    deltaWorldMatrix: THREE.Matrix4
  ) => void;
  /** Drag end event */
  onDragEnd?: () => void;
  children: React.ReactNode;
};

type MoonsProps = {
  moonGroupRef: React.RefObject<THREE.Group>;
  moonRef: React.RefObject<THREE.Mesh>;
  draggable: boolean;
};
const Moons = (props: MoonsProps) => {
  // const matrix = new THREE.Matrix4();

  const MoonTexture1 = useTexture(MoonTexture);

  //moon rotation animation
  useFrame(() => {
    if (props.moonGroupRef.current) {
      props.moonGroupRef.current.rotation.y += 0.001;
    }
  });

  // useFrame(() => {
  //   if (props.moonRef.current) {
  //     // console.log(props.moonRef.current?.position);
  //   }
  // });

  const moonMesh = () => {
    return (
      <group
        position={[0, 0, 0]}
        ref={props.moonGroupRef}
        // rotation={new Euler(0, Math.PI / 1, 0)}
      >
        <mesh position={[-4, 0, 0]} receiveShadow ref={props.moonRef}>
          <sphereGeometry args={[1, 32]} />
          <meshStandardMaterial map={MoonTexture1} />
        </mesh>
      </group>
    );
  };

  return (
    <>
      {props.draggable ? (
        <DragControls
          // autoTransform={true}
          axisLock="y"
        >
          {moonMesh()}
        </DragControls>
      ) : (
        moonMesh()
      )}
    </>

    // // individual moons

    // <>
    //   <mesh position={[-4, 0, 0]} receiveShadow>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[-3, 0, -3]} receiveShadow>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[4, 0, 0]}>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[3, 0, 3]}>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[0, 0, -4]}>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[-3, 0, 3]}>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[0, 0, 4]}>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    //   <mesh position={[3, 0, -3]}>
    //     <sphereGeometry args={[1, 16]} />
    //     <meshStandardMaterial />
    //   </mesh>
    // </>
  );
};

export default Moons;
