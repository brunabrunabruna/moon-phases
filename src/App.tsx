import { useEffect, useRef } from "react";
import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Moons from "./Moons";
import Sun from "./Sun";
import * as THREE from "three";

const CameraComponent = () => {
  const three = useThree();
  const camera = three.camera;

  useEffect(() => {
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
};

function App() {
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);

  //????
  useEffect(() => {
    if (dirLightRef.current) {
      const helper = new THREE.DirectionalLightHelper(dirLightRef.current);
      return () => {
        helper.dispose();
      };
    }
  }, []);

  return (
    <>
      <div id="canvas-container">
        <Canvas shadows>
          <CameraComponent />
          {/* color property sets the scene background color */}
          <color args={["black"]} attach={"background"} />
          <OrbitControls />

          {/* lights */}
          <ambientLight intensity={0.05} />
          <directionalLight
            ref={dirLightRef}
            castShadow
            intensity={1}
            position={[-3, 0, 0]}
            rotation={new THREE.Euler(0, 0, 0)}
          />

          {/* earth */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 16]} />
            <meshBasicMaterial wireframe />
          </mesh>
          {/* moons */}
          <Moons />

          {/* sun */}
          <Sun />
        </Canvas>
      </div>
    </>
  );
}

export default App;
