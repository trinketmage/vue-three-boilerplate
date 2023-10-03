import Input from "./Input";
import Common from "./Common";

import PostProcessing from "@/graphics/postprocessing/index";

import Powers from "@/graphics/components/Powers";

import gsap from "gsap";

import settings from "./config";

export default class {
  constructor({ canvas, initScene = -1 }) {
    Input.init();
    Common.init(canvas);
    settings.idx = initScene;

    settings.sizes = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      frustum: {
        height: 0,
        width: 0
      }
    };
    this.components = {};

    this.renderer = Common.renderer;
    this.scene = Common.scene;

    this.camera = Common.camera;

    this.scene.add(this.camera);

    this.postprocessing = new PostProcessing({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera
    });

    this.init();

    this.handleResize();
    this.x = this.handleResize.bind(this);
    window.addEventListener("resize", this.x, false);

    gsap.ticker.add(this.render.bind(this));
  }
  init() {
    const { scene } = this;
    this.components.powers = new Powers({
      scene
    });
  }
  render(t) {
    Input.render();
    Object.keys(this.components).forEach(_ => {
      this.components[_].render(t);
    });
    this.postprocessing.render(t);
    // this.cameras[0].render();
    // this.renderer.render(this.scene, this.camera);
  }
  handleResize() {
    Object.keys(this.components).forEach(_ => {
      this.components[_].resize();
    });
    
    Input.resize();
    Common.resize();
    this.postprocessing.handleResize();
  }
  destroy() {
    window.removeEventListener("resize", this.x);
    this.postprocessing.dispose();
    Object.keys(this.components).forEach(_ => {
      this.components[_].dispose();
    });

    Input.dispose();
    Common.dispose();
  }
}
