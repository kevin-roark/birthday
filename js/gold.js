
module.exports = Gold;

var map = THREE.ImageUtils.loadTexture('media/gold.png');
map.wrapS = map.wrapT = THREE.RepeatWrapping;
map.anisotropy = 16;

var material = new THREE.MeshPhongMaterial({
    ambient: 0xffffff
  , map: map
  , shininess: 80
  , side: THREE.DoubleSide
});

function Gold(x, y, z, r, d) {
  this.material = material.clone();

  var p = Math.random();
  if (p < 0.85)
    var geometry = new THREE.TorusGeometry(r, d, 16, 16, Math.PI * 2);
  else
    var geometry = new THREE.SphereGeometry(r * 0.6, 16, 16);

  var ring = new THREE.Mesh(geometry, this.material);
  ring.position.set(x, y, z);
  this.ring = ring;

  this.xrs = Math.random() * 0.03 + 0.002;
  this.yrs = Math.random() * 0.03 + 0.002;

  this.yd = 0.0;
}

Gold.prototype.addTo = function(scene) {
  scene.add(this.ring);
}

Gold.prototype.render = function() {
  this.ring.rotation.x += this.xrs;
  this.ring.rotation.y += this.yrs;

  this.ring.position.y += this.yd;
}

Gold.prototype.rain = function() {
  this.yd = -1 * Math.random() * 0.03 - 0.002;
}
