import Device from "@/pure/Device";

import { Scene, WebGLRenderer, Color } from "three";

class Common {
  scene = new Scene();

  constructor() {
    this.scene.background = new Color(0x10100f);
  }

  init(canvas) {
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: false,
      stencil: false,
      depth: true,
      powerPreference: "high-performance",
      antialias: false
    });

    this.renderer.physicallyCorrectLights = true;

    this.renderer.setPixelRatio(Device.pixelRatio);
  }

  render() { }

  dispose() { }

  resize() { }
}

export default new Common();
