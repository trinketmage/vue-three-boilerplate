import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";

export default class {
  constructor({ scene }) {
    this.scene = scene;
    this.init();
  }
  init() {
    const geometry = new BoxGeometry( 2, 2, 2 );
    const material = new MeshBasicMaterial();

    this.mesh = new Mesh( geometry, material );
    this.scene.add( this.mesh );
  }
  render() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.025;
  }
  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.scene.remove(this.mesh);
  }
  resize() {}
}
