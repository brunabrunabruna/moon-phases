import { MutableRefObject, useRef, useState } from "react";
import "./App.css";
import {
  OrbitControls,
  // OrthographicCamera,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import Moons from "./Moons";
import Sun from "./Sun";
import * as THREE from "three";
import PopupInfo from "./PopupInfo";
import seedrandom from "seedrandom";
import { Canvas } from "@react-three/fiber";

//orbit
const MoonOrbit = () => {
  return (
    <mesh
      // rotation={new THREE.Euler(0, 0, Math.PI / 2)}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
    >
      <torusGeometry args={[4, 0.01]} />
      <meshBasicMaterial />
    </mesh>
  );
};

//particles
const ParticlesFunc = () => {
  const particleArray = [];
  const materialRef = useRef(null);

  const randomPosition = (distance: number) => {
    return (random1() * 2 - 1) * distance;
  };
  const random1 = seedrandom("rotation");

  const randomSize = () => {
    return (random1() * 5) / 170;
  };

  for (let i = 0; i < 1000; i++) {
    particleArray.push(
      <mesh
        key={i}
        position={[randomPosition(30), randomPosition(30), randomPosition(30)]}
        // rotation={
        //   new THREE.Euler(randomRotation(), randomRotation(), randomRotation())
        // }
      >
        <sphereGeometry args={[randomSize(), 6]} />
        {/* <circleGeometry args={[0.05]} /> */}
        <meshBasicMaterial
          color={"white"}
          side={THREE.DoubleSide}
          ref={materialRef}
        />
      </mesh>
    );
  }
  return <>{particleArray}</>;
};

//scene component
const Scene = () => {
  return (
    <>
      <color args={["black"]} attach={"background"} />
      <ambientLight intensity={0.05} />
      <directionalLight castShadow intensity={1} position={[-3, 0, 0]} />

      <ParticlesFunc />
    </>
  );
};

const App = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [moonRotation, setMoonRotation] = useState(0);
  //activates or deactivates the camera which rotates together with the moon group (from the center of the scene)
  // const [isCameraRotation, setIsCameraRotation] = useState(false);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* main view */}
        <View
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            width: "100vw",
            zIndex: "100",
          }}
        >
          <PerspectiveCamera makeDefault position={[8, 3, 10]} fov={55} />
          {/* color property sets the scene background color */}
          <OrbitControls />
          {/* moons */}
          <Moons moonRotation={moonRotation} isCameraRotation={false} />
          <Sun />
          <MoonOrbit />
          <Scene />

          {/* earth */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 16]} />
            <meshBasicMaterial wireframe side={1} />
          </mesh>
        </View>

        {/* moon focus view */}
        <View className="moon-focus-view">
          <Moons moonRotation={moonRotation} isCameraRotation={true} />

          <Scene />
        </View>

        <PopupInfo
          title="crescent"
          setMoonRotation={setMoonRotation}
          moonRotation={moonRotation}
        />

        {/* canvas combines and renders all the View components */}
        <Canvas
          shadows
          eventSource={wrapperRef as MutableRefObject<HTMLElement>}
        >
          <View.Port />
        </Canvas>
      </div>
    </>
  );
};

export default App;
