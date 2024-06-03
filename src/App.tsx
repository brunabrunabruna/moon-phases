import { MutableRefObject, useRef, useState } from "react";
import "./App.css";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Moons from "./Moons";
import Sun from "./Sun";
import * as THREE from "three";
import Overlay from "./Overlay";
import seedrandom from "seedrandom";
import { Canvas } from "@react-three/fiber";

//orbit
const MoonOrbit = () => {
  return (
    <mesh rotation={new THREE.Euler(Math.PI / 2, 0, 0)} position={[0, 3, 0]}>
      <torusGeometry args={[4, 0.01, 16, 64]} />
      <meshBasicMaterial color={"#ffcd68"} />
    </mesh>
  );
};

//particles
const Particles = () => {
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
      <ambientLight intensity={0.1} />
      <directionalLight castShadow intensity={1} position={[-3, 0, 0]} />
    </>
  );
};

const App = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [moonRotation, setMoonRotation] = useState(0);

  return (
    <>
      <div className="page-title">
        ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁. Moon Phases . ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁
      </div>
      <div ref={wrapperRef} className="app-wrapper">
        {/* main view */}
        <View className="main-view">
          <PerspectiveCamera makeDefault position={[8, 6, 10]} fov={55} />
          {/* color property sets the scene background color */}
          <OrbitControls enableZoom={false} enablePan={false} />
          {/* moons */}
          <Moons
            moonRotation={moonRotation}
            isCameraRotation={false}
            moonPosition={new THREE.Vector3(-4, 3, 0)}
          />
          <Sun />
          <MoonOrbit />
          <Particles />

          <Scene />

          {/* earth */}
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[1, 16]} />
            <meshBasicMaterial wireframe side={1} />
          </mesh>
        </View>

        {/* moon focus view */}
        <div className="overlay">
          <View className="moon-focus-view">
            <Moons
              moonRotation={moonRotation}
              isCameraRotation={true}
              moonPosition={new THREE.Vector3(-4, 0, 0)}
            />

            <Scene />
          </View>

          <Overlay
            setMoonRotation={setMoonRotation}
            moonRotation={moonRotation}
          />
        </div>
        {/* canvas combines and renders all the View components */}
        <Canvas
          shadows
          eventSource={wrapperRef as MutableRefObject<HTMLElement>}
        >
          <View.Port />
        </Canvas>
        <div className="background"></div>
      </div>
    </>
  );
};

export default App;
