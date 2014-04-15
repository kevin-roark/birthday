
module.exports = World;

var kt = require('./lib/kutility');

function World() {
  this.numCubes = 35;
  this.cubes = [];

  for (var i = 0; i < this.numCubes; i++) {
    var w = kt.randInt(30, 4);
    var h = kt.randInt(25, 3);
    var d = kt.randInt(12, 1);
    var square = new THREE.CubeGeometry(w, h, d);

    var texture = new THREE.MeshBasicMaterial({
        wireframe: false
      , transparent: true
      , opacity: 0.3
    });
    var color = kt.colorWheel(kt.randInt(1536));
    texture.color = new THREE.Color(color);
    texture.wireframeLinewidth = 0.5;

    var ob = new THREE.Mesh(square, texture);
    var x = (Math.random() * 15) - 7.5;
    var y = (Math.random() * 15) - 7.5;
    var z = (Math.random() * 10) - 40;
    ob.position.set(x, y, z);

    this.cubes.push(ob);
  }
}

World.prototype.addTo = function(scene) {
  for (var i = 0; i < this.cubes.length; i++) {
    scene.add(this.cubes[i]);
  }
}
