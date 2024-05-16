/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
import "./PopupInfo.css";
import moonData from "./moonData.json";
import ReactSlider from "react-slider";

console.log(moonData.moonData[0].phase);

const PopupInfo = (props: {
  title: string;
  setMoonRotation: React.Dispatch<React.SetStateAction<number>>;
  moonRotation: number;
  // setCameraRotation: React.Dispatch<React.SetStateAction<number>>;
  // cameraRotation: number;
}) => {
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const maxValue = 700;

  //archive: buttons function>>
  //sets the phase from 0 until 7, then back to 0
  // const handleCurrentPhase = (isPositive: boolean) => {
  //   if (isPositive) {
  //     setCurrentPhase((currentPhase + 1) % 8);
  //   } else {
  //     setCurrentPhase(currentPhase > 0 ? currentPhase - 1 : 7);
  //   }
  // };

  const handleCurrentPhaseSlider = (value: number) => {
    const phaseInterval = maxValue / 8;

    // const value = props.value;

    if (0 <= value && value < phaseInterval) {
      // setCurrentPhase(0);
      return 0;
    } else if (phaseInterval <= value && value < phaseInterval * 2) {
      return 1;
    } else if (phaseInterval * 2 <= value && value < phaseInterval * 3) {
      return 2;
    } else if (phaseInterval * 3 <= value && value < phaseInterval * 4) {
      return 3;
    } else if (phaseInterval * 4 <= value && value < phaseInterval * 5) {
      return 4;
    } else if (phaseInterval * 5 <= value && value < phaseInterval * 6) {
      return 5;
    } else if (phaseInterval * 6 <= value && value < phaseInterval * 7) {
      return 6;
    } else if (phaseInterval * 7 <= value && value < phaseInterval * 8) {
      return 7;
    } else if (phaseInterval * 8 === value) {
      return 0;
    }

    // added this so the types would be Be Happy, but not sure if its the best way... @felix
    else return 0;
  };

  return (
    <div>
      {/* <div className="page-title">
        ˚　　　　✦　　　.　　. 　 ˚　.　　　　　 . ✦　　 .˚ Moon Phases
        ˚　　　　　　　.　　. 　 ˚　.　 . ✦　　 .˚
      </div> */}
      <div className="page-title">
        ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁. Moon Phases . ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁
      </div>

      <div className="popup">
        {/* react slider */}
        <ReactSlider
          min={0}
          max={maxValue}
          onChange={(value: number) => {
            setCurrentPhase(handleCurrentPhaseSlider(value));

            props.setMoonRotation((value * Math.PI * 2) / 700);

            console.log("currentPhase", currentPhase);
            console.log(value);
          }}
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
        />

        <div className="title">{moonData.moonData[currentPhase].phase}</div>
        {/* <div className="details">─ ⊹ ⊱ ☆ ⊰ ⊹ ─</div> */}
        <div className="details">
          ˚　　　　✦　　　.　　. 　 ˚　.　　　　　 . ✦　　 .˚
        </div>

        <div className="description-wrapper">
          <div className="description">
            {moonData.moonData[currentPhase].description}
          </div>
        </div>
        <div>
          {/* <button
            onClick={() => {
              props.setMoonRotation(props.moonRotation - (2 * Math.PI) / 8);
              handleCurrentPhase(false);
              console.log(moonData.moonData[currentPhase].phase);
            }}
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            onClick={() => {
              props.setMoonRotation(props.moonRotation + (2 * Math.PI) / 8);
              handleCurrentPhase(true);
              console.log(moonData.moonData[currentPhase].phase);
            }}
          >
            <AiOutlineArrowRight />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PopupInfo;
