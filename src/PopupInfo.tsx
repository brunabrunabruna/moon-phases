import React from "react";
import "./PopupInfo.css";

const PopupInfo = (props: { title: string }) => {
  return (
    <div className="popup">
      <div className="title">{props.title}</div>
      <div className="description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem architecto
        impedit ad numquam, accusantium quidem sequi consectetur harum nam
        ducimus distinctio non, in perferendis quibusdam? Reiciendis dignissimos
        numquam odio odit Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Nobis quas quia tempore delectus tenetur ullam! Ea similique, iste
        fuga nisi magni autem numquam at quae eaque, cum quia laboriosam neque?
        Reprehenderit possimus rem ullam architecto sint. Magnam adipisci
        dignissimos et. Dolores sapiente ipsa maxime rem atque explicabo
        laboriosam dolorum accusantium doloremque rerum. Nemo assumenda aperiam
        distinctio nam soluta necessitatibus suscipit?
      </div>
    </div>
  );
};

export default PopupInfo;
