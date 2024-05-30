/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
import "./Overlay.css";
import moonData from "./moonData.json";
import ReactSlider from "react-slider";
import "./App.css";

const stepCount = 700;

const Overlay = (props: {
  setMoonRotation: React.Dispatch<React.SetStateAction<number>>;
  moonRotation: number;
}) => {
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  return (
    <div className="overlay-text">
      {/* slider for changing moon phases */}
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
      {/* current moon phase title*/}
      <div className="title">{moonData.moonData[currentPhase].phase}</div>

      {/* added ideographic spaces, which are not deleted when code is formated */}
      <div className="details">
        ˚　　　　✦　　　.　　. 　 ˚　.　　　　　 . ✦　　 .˚
      </div>
      {/* current moon phase description */}
      <div className="description-wrapper">
        <div className="description">
          {moonData.moonData[currentPhase].description}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
