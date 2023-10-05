import * as THREE from "three";

import Common from "@/graphics/Common";

import Powers from "@/graphics/components/Powers";
import Simulation from "@/graphics/components/Simulation";
import face_vert from "@/graphics/components/Simulation/glsl/face.vert";
import color_frag from "@/graphics/components/Simulation/glsl/color.frag";

import PostProcessing from "@/graphics/postprocessing/index";

export default class Output {
  components = {};
  postProcess = false;

  constructor() {
    this.init();
  }

  init() {
    this.components.powers = new Powers();
    this.components.simulation = new Simulation();

    this.postprocessing = new PostProcessing();

    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    this.output = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.RawShaderMaterial({
            vertexShader: face_vert,
            fragmentShader: color_frag,
            uniforms: {
                velocity: {
                    value: this.components.simulation.fbos.vel_0.texture
                },
                boundarySpace: {
                    value: new THREE.Vector2()
                }
            },
        })
    );

    this.scene.add(this.output);
  }

  render(t) {
    Object.keys(this.components).forEach(_ => {
      this.components[_].render(t);
    });
    // if(!this.postProcess) {
    //   Common.render();
    // } else {
    //   this.postprocessing.render(t);
    // }
    Common.renderer.setRenderTarget(null);
    Common.renderer.render(this.scene, this.camera);
  }

  dispose() {
    Object.keys(this.components).forEach(_ => {
      this.components[_].dispose();
    });
    this.postprocessing.dispose();
  }

  resize() {
    Object.keys(this.components).forEach(_ => {
      this.components[_].resize();
    });
    this.postprocessing.resize();
  }
}
