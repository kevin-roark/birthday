
module.exports = Label;

function makeMap(imgname) {
  var map = THREE.ImageUtils.loadTexture(imgname);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.mag_filter = map.min_filter = THREE.LinearFilter;
  map.repeat.set(1, 1);
  map.anisotropy = 8;
  return map;
}

function frontMaterial(map, env) {
  var materialFront = new THREE.MeshPhongMaterial({
      ambient: 0xffffff
    , color: 0xffffff
    , combine: THREE.MixOperation

    , shading: THREE.FlatShading
    , map: map
    , envMap: env
    , shininess: 60
    , reflectivity: 0.25
    , side: THREE.DoubleSide
  });
  return materialFront;
}

function sideMaterial(map, env) {
  var materialSide = new THREE.MeshPhongMaterial({
      ambient: 0xffffff
    , color: 0xffffff
    , combine: THREE.MixOperation

    , shading: THREE.SmoothShading
    , map: map
    , envMap: env
    , shininess: 60
    , reflectivity: 0.25
    , side: THREE.DoubleSide
  });
  return materialSide;
}

function faceMaterial(front, side) {
  return new THREE.MeshFaceMaterial([front, side]);
}

function Label(x, y, z, letters, texture, cubemap) {

  this.map = makeMap(texture);
  this.front = frontMaterial(this.map, cubemap);
  this.side = sideMaterial(this.map, cubemap);
  this.material = faceMaterial(this.front, this.side);

  this.geometry = new THREE.TextGeometry(letters, {
      size: 2
    , height: 4
    , curveSegments: 4
    , font: "droid sans"

    , bevelThickness: 2
		, bevelSize: 0.4
		, bevelSegments: 3
		, bevelEnabled: true
  });

  this.geometry.computeBoundingBox();
	this.geometry.computeVertexNormals();

  this.text = new THREE.Mesh(this.geometry, this.material);
  this.text.position.set(x, y, z);

  this.text.rotation.y -= 0.05;
}

Label.prototype.addTo = function(scene) {
  scene.add(this.text);
}
