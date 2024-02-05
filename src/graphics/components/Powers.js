import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
} from "three";

import Common from "@/graphics/Common";

export default class {
  params = {
    color: 0x0f0f0f,
    wireframe: true,
  }
  constructor() {
    this.init();
  }
  init() {
    const { color, wireframe } = this.params;

    const geometry = new BoxGeometry( 2, 2, 2 );
    const material = new MeshBasicMaterial({
      color,
      wireframe,
    });

    this.mesh = new Mesh( geometry, material );
    Common.scene.add( this.mesh );
  }
  render() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.025;
  }
  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    Common.scene.remove(this.mesh);
  }
  resize() {}

  setDebug(debug) {
    const { params } = this;
    this.debugFolder = debug.addFolder({
      title: "SubComponent",
      expanded: true
    });
    this.debugFolder
      .addBinding(
        params,
        'color',
        {
          label: 'color',
          view: 'color'
        }
      )
      .on('change', () => {
        this.mesh.material.color = new Color(params.color)
      });
      this.debugFolder
        .addBinding(
          params,
          'wireframe',
        )
        .on('change', () => {
          this.mesh.material.wireframe = params.wireframe
        });
    
  }
}
