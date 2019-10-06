import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import mage from "./images/mage.png"
const centerAnchor = new PIXI.Point(0.5, 0.5);

function RedPlayer(props) {

  return (
    <Sprite
      anchor={centerAnchor}
      texture={PIXI.Texture.from(mage)}
      {...props}
    />
  );
}

export default RedPlayer;
