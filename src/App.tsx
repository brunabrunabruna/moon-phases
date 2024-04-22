import { useEffect, useRef } from "react";
import "./App.css";
import { Canvas, useStore, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, View } from "@react-three/drei";
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

const CameraComponent = () => {
  const three = useThree();
  const camera = three.camera;

  useEffect(() => {
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
};

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

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef}>
      <View
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50vw",
          zIndex: "100",
        }}
      >
        {/* <Canvas shadows> */}

        <CameraComponent />
        {/* color property sets the scene background color */}
        <color args={["black"]} attach={"background"} />
        <OrbitControls />
        {/* lights */}
        <ambientLight intensity={0.05} />
        <directionalLight castShadow intensity={1} position={[-3, 0, 0]} />
        <ParticlesFunc />
        {/* earth */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 16]} />
          <meshBasicMaterial wireframe side={1} />
        </mesh>
        {/* moons */}
        <Moons />
        {/* sun */}
        <Sun />
      </View>
      <Canvas shadows>
        <View.Port />
      </Canvas>
      <View
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50vw",
          zIndex: "100",
        }}
      >
        <CameraComponent />
        {/* color property sets the scene background color */}
        <color args={["black"]} attach={"background"} />
        <OrbitControls />

        {/* lights */}
        <ambientLight intensity={0.05} />
        <directionalLight castShadow intensity={1} position={[-3, 0, 0]} />

        <ParticlesFunc />

        {/* earth */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 16]} />
          <meshBasicMaterial wireframe side={1} />
        </mesh>
        {/* moons */}
        <Moons />

        {/* sun */}
        <Sun />
      </View>
      <PopupInfo />
    </div>
  );
}
// function App() {
//   return (
//     <div id="canvas-container">
//       <Canvas shadows>
//         <CameraComponent />
//         <color args={["black"]} attach={"background"} />
//         <OrbitControls />

//         <ambientLight intensity={0.05} />
//         <directionalLight castShadow intensity={1} position={[-3, 0, 0]} />

//         <ParticlesFunc />

//         <mesh position={[0, 0, 0]}>
//           <sphereGeometry args={[1, 16]} />
//           <meshBasicMaterial wireframe side={1} />
//         </mesh>

//         <Moons />

//         <Sun />

//         <View
//           className="popup-info"
//           style={{
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: "30%",
//             height: "30%",
//           }}
//         >
//           <CameraComponent />
//           <ParticlesFunc />
//           {/* Add any other components you want to render in the second view */}
//         </View>
//       </Canvas>
//     </div>
//   );
// }
export default App;
