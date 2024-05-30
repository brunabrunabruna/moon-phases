import { useTexture } from "@react-three/drei";
import SunTextureImg from "../public/img/sun.jpg";
import { Vector3 } from "three";

const Sun = () => {
  const sunTexture = useTexture(SunTextureImg);
  const sunPosition = new Vector3(-14, 3, 0);
  const sphereRadius = 5;
  return (
    <>
      <mesh position={sunPosition}>
        <sphereGeometry args={[sphereRadius]} />
        <meshBasicMaterial color={"yellow"} map={sunTexture} opacity={0.7} />
      </mesh>
    </>
  );
};

export default Sun;
