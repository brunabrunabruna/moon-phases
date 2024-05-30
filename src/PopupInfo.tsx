/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
import "./PopupInfo.css";
import moonData from "./moonData.json";
import ReactSlider from "react-slider";
import "./App.css";

const stepCount = 700;

const PopupInfo = (props: {
  setMoonRotation: React.Dispatch<React.SetStateAction<number>>;
  moonRotation: number;
}) => {
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  return (
    <div className="popup">
      {/* react slider */}
      <ReactSlider
        min={0}
        max={stepCount}
        onChange={(value: number) => {
          setCurrentPhase(Math.floor((value / stepCount) * 8) % 8);
          // sets the moon rotation on the orbit
          props.setMoonRotation((value / stepCount) * 2 * Math.PI);
        }}
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
      />

      <div className="title">{moonData.moonData[currentPhase].phase}</div>
      <div className="details">
        ˚　　　　✦　　　.　　. 　 ˚　.　　　　　 . ✦　　 .˚
      </div>

      <div className="description-wrapper">
        <div className="description">
          {moonData.moonData[currentPhase].description}
        </div>
      </div>
    </div>
  );
};

export default PopupInfo;
