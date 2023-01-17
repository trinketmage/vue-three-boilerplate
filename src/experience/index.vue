<template>
  <div class="scenic-world">
    <canvas ref="scene" />
  </div>
</template>

<script>
import {
  Color
} from "three";

import App from "@/Scene/app";
// import Tweakpane from "tweakpane";
import SETTINGS from "./SETTINGS";
import gsap from "gsap";
export default {
  name: "Scene-No",
  mounted() {
    this.app = new App({ $el: this.$refs.scene, initScene: -1});
    // this.app.camera.layers.disable(0);
    // this.app.camera.layers.enable(1);
      // const pane = new Tweakpane();
      // pane.element.parentNode.style.zIndex = 1000;

      // const rendering = pane.addFolder({ title: 'Rendering' });
      // rendering.addInput(SETTINGS, 'z', { min: -5, max: 5, step: 0.001 });
      // // this.app.cameras[0].instance.position.z = SETTINGS.z

    this.section1 = new gsap.timeline();
    const royalBlue = new Color(0x1b3d61).convertSRGBToLinear();
    this.section1
      .to(SETTINGS, {
        z: 5,
        decay: 0,
        ease: "quint.inOut",
        duration: 3.,
        onUpdate: () => {
          this.app.components.atlas.sphere.updateMatrix();
          this.app.components.galaxy.group.position.z = SETTINGS.z;
          this.app.components.atlas.sphere.position.z = SETTINGS.z - 5;
          
          this.app.postprocessing.mainPass.uniforms.decay.value = SETTINGS.decay;
        }
      }, "a")
      .to(SETTINGS.background, {
        r: royalBlue.r,
        g: royalBlue.g,
        b: royalBlue.b,
        ease: "quint.inOut",
        duration: 3.,
        onUpdate: () => {
          this.app.scene.background = SETTINGS.background;
        }
      }, 'a')
      .to(SETTINGS.atlas, {
        onStart: () => {
          this.app.camera.layers.enable(1);
        },
        transition: 0,
        delay: 0.5,
        ease: "sine.inOut",
        duration: 3,
        onUpdate: () => {
          this.app.components.atlas.material.userData.transition.value = SETTINGS.atlas.transition;
        }
      }, 'a')
      .to(SETTINGS.atlas, {
        glyph: 1,
        delay: 1.5,
        ease: "linear",
        duration: 2,
        // delay: 2.,
        onUpdate: () => {
          this.app.glyph.material.uniforms.mixRatio.value = SETTINGS.atlas.glyph;
        }
      }, 'a')
      .to(SETTINGS.atlas, {
        zodiac: 1,
        delay: 1.5,
        ease: "sine.inOut",
        duration: 2,
        onUpdate: () => {
          this.app.components.atlas.zodiac.material.uniforms.uAlpha.value = (SETTINGS.atlas.zodiac);
        }
      }, 'a')
      .to(SETTINGS.atlas, {
        rotation: 0,
        delay: 0.5,
        ease: "expo.out",
        duration: 3,
        onUpdate: () => {
          this.app.components.atlas.sphere.rotation.y = -1.3125 - SETTINGS.atlas.rotation * Math.PI * 3.750;
        }
      }, 'a');

    this.section2 =  new gsap.timeline();
    this.section2
      .to(SETTINGS.overlay, {
        line: 1,
        ease: "sine.inOut",
        duration: 1.5,
        onUpdate: () => {
          this.app.components.overlay.material.uniforms.uLine.value = SETTINGS.overlay.line
        }
      }, 'a')
      .to(SETTINGS.overlay, {
        alpha: 1,
        ease: "linear",
        duration: 1,
        delay: 2.5,
        onUpdate: () => {
          this.app.components.overlay.material.uniforms.uAlpha.value = SETTINGS.overlay.alpha
        }
      }, 'a')
      .to(SETTINGS.atlas, {
        glyph: 0,
        ease: "linear",
        duration: 2,
        onUpdate: () => {
          this.app.glyph.material.uniforms.mixRatio.value = SETTINGS.atlas.glyph;
        }
      }, 'a');
  },
  beforeUnmount() {
    if (this.app) this.app.destroy();
  },
  methods: {
    playSection1() {
      this.section1.play();
    },
    reverseSection1() {
      // this.app.camera.layers.enable(0);
      // this.app.camera.layers.disable(1);
      // this.section1.reverse();
    }
  }
};
</script>

<style scoped lang="scss">
.scenic-world {
  position: fixed;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  z-index: 0;
  background-color: #10100f;
}
</style>
