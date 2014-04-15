
var kt = require('./lib/kutility');

module.exports = World;

function World() {
  this.numCubes = 60;
  this.cubes = [];

  for (var i = 0; i < this.numCubes; i++) {
    var ob = genBox();
    this.cubes.push(ob);
  }
}

var genBox = function() {
  var w = kt.randInt(15, 4);
  var h = kt.randInt(10, 3);
  var d = kt.randInt(6, 1);
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
  var x = (Math.random() * 40) - 20;
  var y = (Math.random() * 25) - 12.5;
  var z = (Math.random() * 6) - 35;
  ob.position.set(x, y, z);

  return ob;
}

World.prototype.addTo = function(scene) {
  var i = 0;
  var self = this;
  add();

  function add() {
    scene.add(self.cubes[i]);

    if (++i < self.cubes.length)
      setTimeout(add, kt.randInt(400, 50));
  }
}

World.prototype.addBox = function(scene) {
  var box = genBox();
  this.cubes.push(box);
  scene.add(box);
}
