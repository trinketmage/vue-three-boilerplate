import Input from "./Input";
import Common from "./Common";

import Camera from "./cameras/FreeCamera";

import PostProcessing from "@/graphics/postprocessing/index";

import Powers from "@/graphics/components/Powers";

import gsap from "gsap";

import { getFovHeigth } from "@trinketmage/sword";
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

    this.cameras = [new Camera({ sizes: {
      width: this.renderer.domElement.parentElement.offsetWidth,
      height: this.renderer.domElement.parentElement.offsetHeight
    } })];
    this.camera = this.cameras[0].instance;

    this.scene.add(this.cameras[0].container);

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
      this.components[_].render(t, this.sizes);
    });
    this.postprocessing.render(t);
    // this.cameras[0].render();
    // this.renderer.render(this.scene, this.camera);
  }
  handleResize() {
    this.camera.aspect =
      settings.sizes.viewport.width / settings.sizes.viewport.height;
    this.camera.updateProjectionMatrix();
    settings.sizes.frustum.height = getFovHeigth(
      this.camera,
      3.125
    );
    
    settings.sizes.frustum.width =
      settings.sizes.frustum.height * this.camera.aspect;
    this.renderer.setSize(
      settings.sizes.viewport.width,
      settings.sizes.viewport.height
    );
    Object.keys(this.components).forEach(_ => {
      this.components[_].resize(this.sizes);
    });
    
    this.postprocessing.handleResize(settings.sizes);
  }
  destroy() {
    window.removeEventListener("resize", this.x);
    this.renderer.dispose();

    console.log("CA")
    this.postprocessing.dispose();
    if (this.cameras[0]) this.cameras[0].dispose();
    Object.keys(this.components).forEach(_ => {
      this.components[_].dispose();
    });
  }
}
