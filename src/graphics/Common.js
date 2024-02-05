import Device from "@/pure/Device";

import { Scene, WebGL1Renderer as WebGLRenderer, Color, PerspectiveCamera } from "three";

import { Pane } from 'tweakpane';

class Common {
  scene = new Scene();
  params = {
    sceneColor: 0xbebebe
  }

  constructor() {
    this.scene.background = new Color(0xbebebe);
    this.camera = new PerspectiveCamera(
      50,
      Device.viewport.width / Device.viewport.height,
      0.01,
      100.0
    );
    this.camera.position.z = 10;
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

    this.renderer.autoClear = false;
    this.renderer.physicallyCorrectLights = true;

    this.renderer.setPixelRatio(Device.pixelRatio);

    this.debug = window.location.hash === '#debug' ? new Pane() : null;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.dispose();
  }

  resize() {
    Device.viewport.width = this.renderer.domElement.parentElement.offsetWidth;
    Device.viewport.height = this.renderer.domElement.parentElement.offsetHeight;

    this.camera.aspect =
      Device.viewport.width / Device.viewport.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      Device.viewport.width,
      Device.viewport.height
    );
  }

  setDebug() {
    const { debug: pane, params, scene } = this;

    params.sceneColor = '#bebebe';
    scene.background = new Color(params.sceneColor);

    this.debugFolder = pane.addFolder({
      title: "Common",
      expanded: true
    })
    this.debugFolder
      .addBinding(
        params,
        'sceneColor',
        {
          label: 'color',
          view: 'color'
        }
      )
      .on('change', () => {
        scene.background = new Color(params.sceneColor)
      });
  }
}

export default new Common();
