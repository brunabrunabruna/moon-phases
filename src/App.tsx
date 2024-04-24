import { MutableRefObject, useEffect, useRef } from "react";
import "./App.css";
import { Canvas, useStore, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import Moons from "./Moons";
import Sun from "./Sun";
import * as THREE from "three";
import NewCamera from "./NewCamera";
import PopupInfo from "./PopupInfo";

export type ViewProps = {
  /** Root element type, default: div */
  as?: string;
  /** CSS id prop */
  id?: string;
  /** CSS classname prop */
  className?: string;
  /** CSS style prop */
  style?: React.CSSProperties;
  /** If the view is visible or not, default: true */
  visible?: boolean;
  /** Views take over the render loop, optional render index (1 by default) */
  index?: number;
  /** If you know your view is always at the same place set this to 1 to avoid needless getBoundingClientRect overhead */
  frames?: number;
  /** The scene to render, if you leave this undefined it will render the default scene */
  children?: React.ReactNode;
  /** The tracking element, the view will be cut according to its whereabouts
   * @deprecated You can use inline Views now, see: https://github.com/pmndrs/drei/pull/1784
   */
  track?: React.MutableRefObject<HTMLElement>;
};

export type ViewportProps = {
  Port: () => React.ReactNode;
} & React.ForwardRefExoticComponent<
  ViewProps & React.RefAttributes<HTMLElement | THREE.Group>
>;

//particles
const ParticlesFunc = () => {
  const particleArray = [];

  const randomPosition = (distance: number) => {
    return (Math.random() - 0.5) * distance;
  };
  const randomRotation = () => {
    return Math.random() * 2 * Math.PI;
  };
  const randomSize = () => {
    return (Math.random() * 5) / 200;
  };

  for (let i = 0; i < 500; i++) {
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
        <meshBasicMaterial color={"white"} side={THREE.DoubleSide} />
      </mesh>
    );
  }
  return <>{particleArray}</>;
};

// Inside Camera component
interface CameraProps {
  lookAt: React.RefObject<THREE.Mesh>;
}
const Camera = (props: CameraProps) => {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  useEffect(() => {
    if (props.lookAt.current && camera.current) {
      camera.current.lookAt(props.lookAt.current.position);
    }
  }, [props.lookAt, camera]);
  return null;
};

//scene component
const Scene = (props: { draggable: boolean }) => {
  const moonGroupRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <color args={["black"]} attach={"background"} />
      <Camera lookAt={moonGroupRef} />
      {console.log(moonGroupRef.current?.position)}
      <ambientLight intensity={0.05} />
      <directionalLight castShadow intensity={1} position={[-3, 0, 0]} />

      <ParticlesFunc />

      {/* moons */}
      <Moons moonGroupRef={moonGroupRef} draggable={props.draggable} />

      {/* sun */}
      <Sun />
    </>
  );
};

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <PopupInfo title="crescent" />
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
          <PerspectiveCamera makeDefault position={[4, 6, 4]} fov={55} />
          {/* color property sets the scene background color */}
          <OrbitControls />
          <Scene draggable={true} />

          {/* earth */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 16]} />
            <meshBasicMaterial wireframe side={1} />
          </mesh>
        </View>

        {/* moon focus view */}
        <View className="moon-focus-view">
          <PerspectiveCamera
            makeDefault
            position={[2, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 2, 0)}
            fov={25}
            // lookAt={}
          />

          <Scene draggable={false} />
        </View>

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
}

export default App;
