var kt = require('./lib/kutility');

var url = 'media/socialmedia.jpg';

var urls = [
  url,
  url,
  url,
  url,
  url,
  url
];

var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
cubemap.format = THREE.RGBFormat;
cubemap.wrapS = THREE.RepeatWrapping;
cubemap.wrapT = THREE.RepeatWrapping;
cubemap.repeat.set(2, 2);

var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
shader.uniforms['tCube'].value = cubemap; // apply textures to shader

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide,
  opacity: 0.5
});

// create skybox mesh
var skybox = new THREE.Mesh(
  new THREE.CubeGeometry(500, 500, 500),
  skyBoxMaterial
);

module.exports.skybox = skybox;
module.exports.cubemap = cubemap;
