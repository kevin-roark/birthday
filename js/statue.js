
module.exports = exports = Statue;

var kt = require('./lib/kutility');

function Statue(frontimg, w, h, d) {
  this.frontTexture = THREE.ImageUtils.loadTexture(frontimg);
  this.frontTexture.wrapS = THREE.RepeatWrapping;
  this.frontTexture.wrapT = THREE.RepeatWrapping;

  this.frontMaterial = new THREE.MeshPhongMaterial({ map: this.frontTexture});

  var materials = [];
  materials.push(this.frontMaterial);
  for (var i = 0; i < 5; i++)
    materials.push(this.frontMaterial.clone());

  this.statueMaterial = new THREE.MeshFaceMaterial(materials);

  this.geometry = new THREE.CubeGeometry(w, h, d);
  this.structure = new THREE.Mesh(this.geometry, this.statueMaterial);
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

Statue.prototype.colorSides = function() {
  var materials = this.statueMaterial.materials;
  for (var i = 0; i < materials.length; i++) {
    if (i == 3) continue; // front side

    var mat = materials[i];
    var col = kt.colorWheel(kt.randInt(1536));
    mat.color = new THREE.Color(col);
  }
}
