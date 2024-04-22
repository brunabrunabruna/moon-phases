import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import "./NewCamera.css";

<style></style>;

const NewCameraComponent = () => {
  const three = useThree();
  const camera = three.camera;

  useEffect(() => {
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  //component has to have a return statement
  return null;
};

const NewCamera = () => {
  return (
    <>
      <div id="new-canvas-container">
        <Canvas shadows>
          <NewCameraComponent />
        </Canvas>
      </div>
    </>
  );
};

export default NewCamera;
