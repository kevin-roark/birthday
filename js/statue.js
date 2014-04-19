
module.exports = exports = Statue;

var kt = require('./lib/kutility');

var DEFAULT_SPEED = 0.005;

function Statue(frontimg, skymap, w, h, d) {
  this.frontTexture = THREE.ImageUtils.loadTexture(frontimg);
  this.frontTexture.wrapS = THREE.RepeatWrapping;
  this.frontTexture.wrapT = THREE.RepeatWrapping;

  this.frontMaterial = new THREE.MeshPhongMaterial({
      map: this.frontTexture
    , envMap: skymap
    , shininess: 100
    , combine: THREE.MixOperation
    , reflectivity: 0.35
  });

  var materials = [];
  materials.push(this.frontMaterial);
  for (var i = 0; i < 5; i++)
    materials.push(this.frontMaterial.clone());

  this.statueMaterial = new THREE.MeshFaceMaterial(materials);

  this.geometry = new THREE.CubeGeometry(w, h, d);
  this.structure = new THREE.Mesh(this.geometry, this.statueMaterial);

  this.mode = null;
  this.speed = DEFAULT_SPEED; // zoom speed
  this.zoombackSpeed = 0.5;

  this.rdx = 0.0; // rotation delta x
  this.rdy = 0.01; // rotation delta y

  this.zbackthresh = -50.0; // how far to zoom back
  this.desiredZ = -5.0; // how far to come back up

  this.desiredY = 1.0;

  this.awayVector = {
    x: 0.25,
    y: 0.2,
    z: -0.2
  };
}

Statue.prototype.addTo = function(scene) {
  scene.add(this.structure);
}

Statue.prototype.rotate = function(dx, dy) {
  this.structure.rotation.x += dx;
  this.structure.rotation.y += dy;
}

Statue.prototype.move = function(dx, dy, dz) {
  this.structure.position.x += dx;
  this.structure.position.y += dy;
  this.structure.position.z += dz;
}

Statue.prototype.clear = function() {
  this.structure.rotation.x = 0;
  this.structure.rotation.y = 0;
}

Statue.prototype.colorSides = function() {
  var materials = this.statueMaterial.materials;
  for (var i = 0; i < materials.length; i++) {
    if (i == 3) continue; // front side

    var mat = materials[i];
    var col = kt.colorWheel(kt.randInt(1536));
    mat.color = new THREE.Color(col);
  }
}

Statue.prototype.render = function() {
  if (this.mode == 'zoomin') {
    this.move(0, 0, -1 * this.speed);
    this.speed = Math.max(this.speed, DEFAULT_SPEED * Math.abs(this.structure.position.z) * 0.8);
    if (this.structure.position.z <= this.zbackthresh) {
      this.mode = 'zoomback';
      this.structure.position.x = 0;
      this.structure.position.y = this.desiredY;
    }
  } else if (this.mode == 'zoomback') {
    this.move(0, 0, this.zoombackSpeed);
    if (this.structure.position.z >= this.desiredZ) {
      this.mode = 'rotate';
    }
  } else if (this.mode == 'rotate') {
    this.rotate(this.rdx, this.rdy);
  } else if (this.mode == 'away') {
    var x = Math.random() * this.awayVector.x - 0.05;
    var y = Math.random() * this.awayVector.y - 0.05;
    var z = Math.random() * this.awayVector.z - 0.05;
    this.move(x, y, z);
    if (this.structure.position.z <= this.zbackthresh - 10) {
      this.mode = 'gone';
    }
  }
}

Statue.prototype.goCrazy = function() {
  var self = this;
  this.timer = setInterval(function() {
    self.rdy *= 1.012;
  }, 100);
}
