
module.exports = exports = Smoke;

var kt = require('./lib/kutility');

function Smoke(x, y, z, num) {
  if (!num) num = 250;

  this.texture = THREE.ImageUtils.loadTexture('media/smoke.png');

  this.particles = new THREE.Geometry;
  for (var i = 0; i < num; i++) {
    var xp = randX();
    var yp = Math.random() * 1.7 - 1;
    var zp = randZ();
    var particle = new THREE.Vector3(xp, yp, zp);
    this.particles.vertices.push(particle);
  }

  this.material = new THREE.ParticleBasicMaterial({
      map: this.texture
    , transparent: true
    , blending: THREE.AdditiveBlending
    , size: 0.5
    , color: 0x111111
  });

  this.smoke = new THREE.ParticleSystem(this.particles, this.material);
  this.smoke.sortParticles = true;
  this.smoke.position.x = x;
  this.smoke.position.y = y;
  this.smoke.position.z = z;
}

Smoke.prototype.addTo = function(scene) {
  scene.add(this.smoke);
}

function randX() {
  return Math.random() * 0.3;
}

function randZ() {
  return Math.random() * 0.5;
}

Smoke.prototype.render = function() {
  var particleCount = this.particles.vertices.length;
  while (particleCount--) {
    var particle = this.particles.vertices[particleCount];
    particle.y += 0.02;

    if (particle.y >= this.smoke.position.y + 1.1) {
      particle.y = Math.random() - 1;
      particle.x = randX();
      particle.z = randZ();
    }
  }
  this.particles.__dirtyVertices = true;
}

Smoke.prototype.colorShift = function() {
  var color = kt.colorWheel(kt.randInt(1536));
  this.smoke.material.color = new THREE.Color(color);
}
