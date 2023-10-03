import { Vector3 } from "three";

import { Clock } from "@trinketmage/sword";
export default {
  // color: 0xffffff,
  clock: new Clock(),
  intersected: null,
  progress: 1,
  animated: false,
  exposure: 1,
  bloomStrength: 1.6,
  bloomThreshold: 0.02,
  bloomRadius: 0.15,
  // bloomStrength: 0,
  // bloomThreshold: 0,
  // bloomRadius: 0.,
  light: {
    intensity: 20,
    // position: new Vector3(2.3, 1.683, 0.712)
    light: new Vector3(-0.635, 0.926, -1.762)
  },
  camera: {
    position: {
      x: 0,
      y: 1.838,
      z: 1.152
    },
    rotation: new Vector3(0, 0, 0),
    initFrame: {
      position: new Vector3(-2.520984365001518, 1, 3.8342794833256044),
      rotation: new Vector3(0, -0.464, 0),
      light: new Vector3(0, 1.838, 1.152)
    },
    frames: [
      {
        // position: new Vector3(0, 0, 3.8342794833256044),
        position: new Vector3(0, -0.9050000000000006 + 1.3125, 3.125),
        rotation: new Vector3(0.075, 0.0, 0),
        light: new Vector3(0, 1.838, 1.152)
        // light: new Vector3(-0.635, 0.926, -1.762)
      },
      {
        position: new Vector3(0, 1.838, 0.03125),
        rotation: new Vector3(0.3125, 0, 0.0),
        light: new Vector3(-0.635, 1.706, 1.099)
        // light: new Vector3(-0.635, 0.926, -1.762)
      },
      {
        position: new Vector3(2.520984365001518, 1, 3.8342794833256044),
        rotation: new Vector3(0, 0.464, 0),
        light: new Vector3(0, 1.838, 1.152)
      },
      {
        position: new Vector3(2.520984365001518, 1, 3.8342794833256044),
        rotation: new Vector3(0, 0.464, 0),
        light: new Vector3(0, 1.838, 1.152)
      }
    ]
  },
  composition: {
    BLOOM_SCENE: 1,
    ENTIRE_SCENE: 0
  }
  // intensity: 15
};
