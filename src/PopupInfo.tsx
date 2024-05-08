import React, { useState } from "react";
import "./PopupInfo.css";
import moonData from "./moonData.json";
import { div } from "three/examples/jsm/nodes/Nodes.js";

console.log(moonData.moonData[0].phase);

const PopupInfo = (props: {
  title: string;
  setMoonRotation: React.Dispatch<React.SetStateAction<number>>;
  moonRotation: number;
  // setCameraRotation: React.Dispatch<React.SetStateAction<number>>;
  // cameraRotation: number;
}) => {
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  //sets the phase from 0 until 7, then back to 0
  const handleCurrentPhase = (isPositive: boolean) => {
    if (isPositive) {
      setCurrentPhase((currentPhase + 1) % 8);
    } else {
      setCurrentPhase(currentPhase > 0 ? currentPhase - 1 : 7);
    }
  };

  return (
    <div>
      <div className="popup">
        <div className="title">{moonData.moonData[currentPhase].phase}</div>
        <div className="description">
          {moonData.moonData[currentPhase].description}
        </div>
        <div>
          <button
            onClick={() => {
              props.setMoonRotation(props.moonRotation + (2 * Math.PI) / 8);
              handleCurrentPhase(true);
              console.log(moonData.moonData[currentPhase].phase);
            }}
          >
            next phase
          </button>
          <button
            onClick={() => {
              props.setMoonRotation(props.moonRotation - (2 * Math.PI) / 8);
              handleCurrentPhase(false);
              console.log(moonData.moonData[currentPhase].phase);
            }}
          >
            previous phase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupInfo;
