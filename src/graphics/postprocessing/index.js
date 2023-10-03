import Device from "@/pure/Device";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Uniform } from "three";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
// import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
// import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

// import settings from "./../config";
// import NoisePass from "@/Scene/postprocessing/NoisePass";
// import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import {Vector2} from "three";

// var loader = new TextureLoader();

export default class PostProcessing {
  constructor({ renderer, scene, camera }) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.passes = {};
    this.composers = {};

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // var fxaaPass = new ShaderPass(FXAAShader);
    // var pixelRatio = this.renderer.getPixelRatio();
    //
    // fxaaPass.material.uniforms["resolution"].value.x =
    //   1 / (window.innerWidth * pixelRatio);
    // fxaaPass.material.uniforms["resolution"].value.y =
    //   1 / (window.innerHeight * pixelRatio);

    // var rgbPass = new ShaderPass(RGBShiftShader);
    // rgbPass.uniforms["amount"].value = 0.000625;

    // this.composer.addPass(fxaaPass);
    // this.composer.addPass(rgbPass);


    // const gammaCorrectionPass = new ShaderPass( GammaCorrectionShader );
    // this.composer.addPass( gammaCorrectionPass );

    // const texture = loader.load("/assets/noise.png");
    this.mainPass = new ShaderPass({
      uniforms: {
        "tDiffuse": { value: null },
        // "noiseTexture": new Uniform(),
        "resolution": new Uniform(new Vector2(window.innerWidth * Device.pixelRatio, window.innerHeight * Device.pixelRatio)),
        "decay": new Uniform(1),
        "time": new Uniform(0)
      },
      vertexShader,
      fragmentShader
    })
    // this.mainPass.uniforms.noiseTexture.value = texture;
    this.composer.addPass( this.mainPass );

  }
  render(t) {
    this.mainPass.uniforms.time.value = t;
    // {
    //   this.camera.layers.set(settings.composition.BLOOM_SCENE);
    //   this.composers.bloomComposer.render();
    //   this.camera.layers.set(settings.composition.ENTIRE_SCENE);
    // }s

    this.composer.render();
  }
  dispose() {
    this.composer.reset();
  }
  handleResize(sizes) {
    const { width, height } = sizes.viewport;
    this.composer.setSize(width, height);
    this.mainPass.material.uniforms.resolution.value.set(width * Device.pixelRatio, height * Device.pixelRatio);

    // this.composers.bloomComposer.setSize(
    //   sizes.viewport.width,
    //   sizes.viewport.height
    // );
    // this.composers.finalComposer.setSize(
    //   sizes.viewport.width,
    //   sizes.viewport.height
    // );
  }
}
