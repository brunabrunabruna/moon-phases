import { useTexture } from "@react-three/drei";
import sunTexture from "../public/img/sun.jpg";

const Sun = () => {
  const sunTexture1 = useTexture(sunTexture);

  return (
    <>
      <mesh position={[-14, 3, 0]}>
        <sphereGeometry args={[5]} />
        <meshBasicMaterial
          color={"yellow"}
          map={sunTexture1}
          // transparent={true}
          opacity={0.7}
        />
      </mesh>
    </>
  );
};

export default Sun;
