import Input from "./Input";
import Common from "./Common";

import PostProcessing from "@/graphics/postprocessing/index";

import Powers from "@/graphics/components/Powers";

import gsap from "gsap";

export default class {
  components = {};
  
  constructor({ canvas }) {
    Input.init();
    Common.init(canvas);

    this.postprocessing = new PostProcessing();

    this.init();

    this.handleResize();
    this.x = this.handleResize.bind(this);
    window.addEventListener("resize", this.x, false);

    gsap.ticker.add(this.render.bind(this));
  }
  init() {
    const { scene } = Common;
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
