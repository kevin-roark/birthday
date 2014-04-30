(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = Gold;

var map = THREE.ImageUtils.loadTexture('media/gold.png');
map.wrapS = map.wrapT = THREE.RepeatWrapping;
map.mag_filter = map.min_filter = THREE.LinearFilter;
map.repeat.set(1, 1);
map.anisotropy = 8;

var material = new THREE.MeshPhongMaterial({
    ambient: 0xbbbbbb
  , map: map
  , shininess: 80
  , side: THREE.DoubleSide
});

function Gold(x, y, z, r, d) {
  this.material = material.clone();

  var p = Math.random();
  if (p < 0.69)
    var geometry = new THREE.TorusGeometry(r, d, 16, 16, Math.PI * 2);
  else if (p < 0.88)
    var geometry = new THREE.SphereGeometry(r * 0.6, 16, 16);
  else {
    var r1 = r * 0.35 + (Math.random() * 0.2) - 0.1;
    var r2 = r1 + (Math.random() * 0.05 - 0.025);
    var geometry = new THREE.CylinderGeometry(r1, r2, d * 15, 16, 2);
  }

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

},{}],2:[function(require,module,exports){

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
    , reflectivity: 0.5
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
    , reflectivity: 0.5
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
      size: 2.2
    , height: 0.01
    , curveSegments: 1
    , font: "droid sans"

    , bevelThickness: 0.35
		, bevelSize: 0.15
		, bevelSegments: 1
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

},{}],3:[function(require,module,exports){
/* export something */
module.exports = new Kutility;

/* constructor does nothing at this point */
function Kutility() {

}

/**
 * get a random object from the array arr
 *
 * @api public
 */

Kutility.prototype.choice = function(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

/**
 * return shuffled version of an array.
 *
 * adapted from css tricks
 *
 * @api public
 */
Kutility.prototype.shuffle = function(arr) {
  var newArray = new Array(arr.length);
  for (var i = 0; i < arr.length; i++)
    newArray[i] = arr[i];

  newArray.sort(function() { return 0.5 - Math.random() });
  return newArray;
}

/**
 * returns a random color as an 'rgb(x, y, z)' string
 *
 * @api public
 */
Kutility.prototype.randColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Kutility.prototype.randInt = function(max, min) {
  if (min)
    return Math.floor(Math.random() * (max - min)) + min;
  else
    return Math.floor(Math.random() * (max));
}

/**
 * Color wheel 1 -> 1536.
 *
 * Written by Henry Van Dusen, all attribution to the big boy.
 * Slightly modified by Kev.
 *
 * @api public
 */
 Kutility.prototype.colorWheel = function(num) {
    var text = "rgb(";
    var entry = num % 1536;
    var num = entry % 256;

    if(entry < 256 * 1)
    	return text + "0,255," + num + ")";
    else if(entry < 256 * 2)
    	return text + "0," + (255 - num) + ",255)";
    else if(entry < 256 * 3)
      return text + num + ",0,255)";
    else if(entry < 256 * 4)
      return text + "255,0," + (255 - num) + ")";
    else if(entry < 256 * 5)
      return text + "255," + num + ",0)";
    else
      return text + (255 - num) + ",255,0)";
 }

 /**
  * Make an rbg() color string an rgba() color string
  *
  * @api public
  */
Kutility.prototype.alphize = function(color, alpha) {
  color.replace('rgb', 'rgba');
  color.replace(')', ', ' + alpha + ')');
  return color;
}

/**
 * Get an array of two random contrasting colors.
 *
 * @api public
 */
Kutility.prototype.contrasters = function() {
  var num = Math.floor(Math.random() * 1536);
  var fg = this.colorWheel(num);
  var bg = this.colorWheel(num + 650);
  return [fg, bg];
}

/**
 * Add a random shadow to a jquery element
 *
 * @api public
 */
Kutility.prototype.randomShadow = function(el, size) {
  var s = size + 'px';
  var shadow = '0px 0px ' + s + ' ' + s + ' ' + this.randColor();
  addShadow(el, shadow);
}

/**
 * Add shadow with offset x and y pixels, z pixels of blur radius,
 * w pizels of spread radius, and cool color
 *
 * @api public
 */
Kutility.prototype.shadow = function(el, x, y, z, w, color) {
  var xp = x + "px";
  var yp = y + "px";
  var zp = z + "px";
  var wp = w + "px";

  var shadow = xp + " " + yp + " " + zp + " " + wp + " " + color;
  addShadow(el, shadow);
}

function addShadow(el, shadow) {
  el.css('-webkit-box-shadow', shadow);
  el.css('-moz-box-shadow', shadow);
  el.css('box-shadow', shadow);
}

/**
 * Add transform to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addTransform = function(el, transform) {
  var curTransform = this.getTransform(el);
  curTransform = curTransform.replace('none', '');
  var newTransform = curTransform + transform;
  this.setTransform(el, newTransform);
}

/**
 * Set transform of element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.setTransform = function(el, transform) {
  el.css('-webkit-transform', transform);
  el.css('-moz-transform', transform);
  el.css('-ms-transform', transform);
  el.css('-o-transform', transform);
  el.css('transform', transform);
}

/**
 * Check an elements tansform.
 *
 * @api public
 */
Kutility.prototype.getTransform = function(el) {
  var possible = ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all transforms from element.
 *
 * @api public
 */
Kutility.prototype.clearTransforms = function(el) {
  el.css('-webkit-transform', '');
  el.css('-moz-transform', '');
  el.css('-ms-transform', '');
  el.css('-o-transform', '');
  el.css('transform', '');
}

/**
 * Rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.rotate = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct  + t);
}

/**
 * Scale an element by x (no units);
 *
 * @api public
 */
Kutility.prototype.scale = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' scale(' + x + ',' + x + ')';
  this.setTransform(el, ct + t);
}

/**
 * Translate an element by x, y (include your own units);
 *
 * @api public
 */
Kutility.prototype.translate = function(el, x, y) {
  var ct = this.getTransform(el);
  console.log(ct);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + t);
}

/**
 * Skew an element by x, y degrees;
 *
 * @api public
 */
Kutility.prototype.skew = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/skew\(.*?\)/, '').replace(/matrix\(.*?\)/, '').replace('none', '');

  var xd = x + 'deg';
  var yd = y + 'deg';
  var t = ' skew(' + xd + ', ' + yd + ')';
  this.setTransform(el, ct + t);
}

/**
 * Warp an element by rotating and skewing it.
 *
 * @api public
 */
Kutility.prototype.warp = function(el, d, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var r = ' rotate(' + d + 'deg)';
  var xd = x + 'deg';
  var yd = y + 'deg';
  var s = ' skew(' + xd + ', ' + yd + ')';

  this.setTransform(el, ct + r + s);
}

/**
 * scale by w, translate x y
 *
 * @api public
 */
Kutility.prototype.slaw = function(el, w, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + s + t);
}

/**
 * scale by w, rotate by x
 *
 * @api public
 */
Kutility.prototype.straw = function(el, w, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var r = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct + s + r);
}

/**
 * Set perspective to x pixels
 *
 * @api public
 */
Kutility.prototype.perp = function(el, x) {
  var p = x + 'px';
  el.css('-webkit-perspective', p);
  el.css('-moz-perspective', p);
  el.css('-ms-perspective', p);
  el.css('-o-perspective', p);
  el.css('perspective', p);
}

/**
 * Set perspective-origin to x and y percents.
 *
 * @api public
 */
Kutility.prototype.perpo = function(el, x, y) {
  var p = x + "% " + y + "%";
  el.css('-webkit-perspective-origin', p);
  el.css('-moz-perspective-origin', p);
  el.css('-ms-perspective-origin', p);
  el.css('-o-perspective-origin', p);
  el.css('perspective-origin', p);
}

/**
 * Translate an element by x, y, z pixels
 *
 * @api public
 */
Kutility.prototype.trans3d = function(el, x, y, z) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix3d\(.*?\)/, '').replace('none', '');

  var t = ' translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
  this.setTransform(el, ct + t);
}

/**
 * Scale an element by x (no units)
 *
 * @api public
 */
Kutility.prototype.scale3d = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix3d\(.*?\)/, '').replace('none', '');

  var t = ' scale3d(' + x + ', ' + x + ', ' + z + ')';
  this.setTransform(el, ct + t);
}

/**
 * Rotate an element about <x, y, z> by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3d = function(el, x, y, z, d) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix3d\(.*?\)/, '').replace('none', '');

  var t = ' rotate3d(' + x + ', ' + y + ', ' + z + ', ' + d + 'deg)';
  this.setTransform(el, ct + t);
}

/**
 * Rotate an element about x axis by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3dx = function(el, d) {
  this.rotate3d(el, 1, 0, 0, d);
}

/**
 * Rotate an element about y axis by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3dy = function(el, d) {
  this.rotate3d(el, 0, 1, 0, d);
}

/**
 * Rotate an element about z axis by d degrees
 *
 * @api public
 */
Kutility.prototype.rotate3dz = function(el, d) {
  this.rotate3d(el, 0, 0, 1, d);
}

/**
 * Add filter to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addFilter = function(el, filter) {
  var curFilter = this.getFilter(el);
  curFilter = curFilter.replace('none', '');
  var newFilter = curFilter + ' ' + filter;
  this.setFilter(el, newFilter);
}

/**
 * Set filter to element with all lame prefixes.
 *
 * @api public
 */
Kutility.prototype.setFilter = function(el, filter) {
  el.css('-webkit-filter', filter);
  el.css('-moz-filter', filter);
  el.css('-ms-filter', filter);
  el.css('-o-filter', filter);
  el.css('filter', filter);
}

/**
 * Check an elements filter.
 *
 * @api public
 */
Kutility.prototype.getFilter = function(el) {
  var possible = ['filter', '-webkit-filter', '-moz-filter', '-ms-filter', '-o-filter'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all filters from element.
 *
 * @api public
 */
Kutility.prototype.clearFilters = function(el) {
  el.css('-webkit-filter', '');
  el.css('-moz-filter', '');
  el.css('-ms-filter', '');
  el.css('-o-filter', '');
  el.css('filter', '');
}

/**

/**
 * Grayscale an element by x percent.
 *
 * @api public
 */
Kutility.prototype.grayscale = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/grayscale\(.*?\)/, '').replace('none', '');

  var f = ' grayscale(' + x + '%)';
  this.setFilter(el, cf  + f);
}

/**
 * Sepia an element by x percent.
 *
 * @api public
 */
Kutility.prototype.sepia = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/sepia\(.*?\)/, '').replace('none', '');

  var f = ' sepia(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Saturate an element by x percent.
 *
 * @api public
 */
Kutility.prototype.saturate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/saturate\(.*?\)/, '').replace('none', '');

  var f = ' saturate(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Invert an element by x percent.
 *
 * @api public
 */
Kutility.prototype.invert = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/invert\(.*?\)/, '').replace('none', '');

  var f = ' invert(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Hue-rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.hutate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/hue-rotate\(.*?\)/, '').replace('none', '');

  var f = ' hue-rotate(' + x + 'deg)';
  this.setFilter(el, cf + f);
}

/**
 * Set opacity of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.opace = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/opacity\(.*?\)/, '').replace('none', '');

  var f = ' opacity(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set brightness of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.brightness = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/brightness\(.*?\)/, '').replace('none', '');

  var f = ' brightness(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set contrast of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.contrast = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/contrast\(.*?\)/, '').replace('none', '');

  var f = ' contrast(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Blur an element by x pixels.
 *
 * @api public
 */
Kutility.prototype.blur = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/blur\(.*?\)/, '').replace('none', '');

  var f = ' blur(' + x + 'px)';
  this.setFilter(el, cf + f);
}

},{}],4:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility');
  var Statue = require('./statue');
  var Smoke = require('./smoke');
  var World = require('./world');
  var sb = require('./skybox');
  var skybox = sb.skybox;
  var cubemap = sb.cubemap;
  var Gold = require('./gold');
  var Label = require('./label');
  var mover = require('./mover');

  var audio = document.querySelector('#audio');
  var $aud = $(audio);

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

  var renderer;
  var rendermode = 'webgl';
  try {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x333333, 1);
  } catch(e) {
    $('.error').show();
    setTimeout(function() {
      $('.error').fadeOut();
    }, 6666);
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0x111111, 1);
    rendermode = 'canvas';
    audio.loop = true;
  }

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

  var canvas = document.querySelector('canvas');
  var $canvas = $(canvas);

  scene.add(skybox);

  var spotlight = new THREE.SpotLight(new THREE.Color('rgb(255, 255, 200)'), 1.6, 1000);
  spotlight.position.set(0, 100, 250);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 2;
  spotlight.exponent = 5.0;
  spotlight.shadowDarkness = 0.8;
  scene.add(spotlight);

  var light = new THREE.AmbientLight(0x404000); // soft yellow light
  scene.add(light);

  var lilian = new Statue('media/lilian.png', cubemap, 2, 0.7, 2);
  var fwb = new Statue('media/fwb.png', cubemap, 2, 1.5, 1.8);
  var genwife = new Statue('media/genwife.png', cubemap, 1.8, 0.9, 1.4);
  var vp = new Statue('media/vp.png', cubemap, 1.2, 1.9, 1.5);
  var linked = new Statue('media/linked.png', cubemap, 2.5, 0.75, 1.5);

  var smokestacks = [];
  var golds = [];
  var textures = ['media/flame.jpg', 'media/water.jpg', 'media/grass.jpg', 'media/metal.jpg'];
  var phrases = [
    'facebook', 'analytics', 'social media',
    'insights', 'data feed', 'consume',
    'friends', 'features', 'blogging platform',
    'content', 'enrich', 'evolve', 'stream',
    'stress', 'presence', 'connect', 'functionality',
    'capability', 'understanding', 'fear', 'interaction',
    'reality', 'empathy', 'revenue', 'agency', 'brand'
  ];

  var numMedia = 1; // number of things to load
  var mediasReady = 0;

  var active = {};

  var names = [];
  var nameMap = {};
  var $nameMap = {};

  var AUDIO_LENGTH = 300000;
  var WORLD_TIME = 35000;
  var TWEET1_TIME = 45000;
  var SMOKE_TIME = 94000;
  var GOLD_TIME = 25000;
  var TWEET2_TIME = 98000;
  var VP_TIME = 150000;
  var LINKED_TIME = 209000;
  var LANDSCAPE_TIME = 210000;
  var LABEL_TIME = 47000;
  var WRAPUP_TIME = 262000;

  audio.addEventListener('canplaythrough', mediaReady);

  function mediaReady() {
    mediasReady++;
    if (mediasReady == numMedia) {
      start();
    }
  }

  function start() {

    audio.play();

    startLilian();
    render();
    setTimeout(hideFooter, 1000);

    if (rendermode == 'canvas')
      return;

    setTimeout(addWorld, WORLD_TIME);
    setTimeout(startTweet1, TWEET1_TIME);
    setTimeout(startSmoke, SMOKE_TIME);
    setTimeout(startTweet2, TWEET2_TIME);
    setTimeout(startVp, VP_TIME);
    setTimeout(startLinked, LINKED_TIME);
    setTimeout(landscapeWarp, LANDSCAPE_TIME);
    setTimeout(startGold, GOLD_TIME);
    setTimeout(startLabels, LABEL_TIME);
    setTimeout(wrapItUp, WRAPUP_TIME);

    soundControl();

    setInterval(function() {
      //$('.debug-timer').html(audio.currentTime);
    }, 200);
  }

  function endgame() {

    function exist() {
      function hello() {
        $canvas.animate({opacity: '1.0'}, kt.randInt(15000, 5000), function() {
          setTimeout(function() {
            $canvas.animate({opacity: '0'}, kt.randInt(15000, 5000), function() {
              setTimeout(hello, 5);
            });
          }, kt.randInt(15000, 10000));
        });
      }

      function explore() {
        var x = (Math.random() * 60) - 30;
        var y = (Math.random() * 40) - 20;
        var z = (Math.random() * 200) - 190;
        mover.moveTo(camera, x, y, z, true, false, function() {
          setTimeout(explore, 5);
        });
      }

      light.color = new THREE.Color('rgb(255, 255, 215)');
      spotlight.position.set(0, 100, 250);
      audio.loop = true;
      audio.currentTime = 0;
      audio.play();
      for (var i = 0; i < 9; i++)
        audio.play();

      hello();
      explore();
    }

    function showFooter() {
      $('.footer').animate({
        opacity: 1.0
      }, 600);

      $('.footer').unbind('mouseenter');
      $('.footer').unbind('mouseleave');
    }

    showFooter();
    setTimeout(exist, 5000);
  }

  function hideFooter() {
    $('.footer').animate({
      opacity: 0.0
    }, 800);

    $('.footer').mouseenter(function() {
      $(this).animate({
        opacity: 1.0
      }, 400);
    });

    $('.footer').mouseleave(function() {
      $(this).animate({
        opacity: 0.0
      }, 400);
    });
  }

  function soundControl() {

  }

  function speed(vid, rate) {
    vid.playbackRate = rate;
  }

  function removeLater(el) {
    setTimeout(function() {
      el.remove();
    }, kt.randInt(6666, 2666));
  }

  function render() {
    setTimeout(render, 20);

    doLilian();
    doSmoke();
    doLight();
    doFwb();
    doGenwife();
    doVp();
    doLinked();
    doGold();

    renderer.render(scene, camera);
  }

  function addWorld() {
    var world = new World();
    world.addTo(scene);
  }

  function startLilian() {
    lilian.addTo(scene);
    active.lilian = true;

    lilian.rotate(0.2, 0, 0);
    lilian.move(0, 1, -1);
    lilian.mode = 'zoomin';
    lilian.speed = 0.005;

    spotlight.target = lilian.structure;
    //spotlight.color = new THREE.Color('rgb(255, 255, 180)'); // gold
  }

  function resetCamera() {
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
  }

  function zoomAround(callback) {
    var zooms = 0;
    var max = kt.randInt(4, 2);
    zoom();

    function zoom() {
      zooms++;
      if (zooms > max) {
        mover.moveTo(camera, 0, 0, 0, false, false, function() {
          resetCamera();
          callback();
        });
        return;
      }

      var x = (Math.random() * 40) - 20;
      var y = (Math.random() * 25) - 12.5;
      var z = (Math.random() * 4) - 34;

      mover.moveTo(camera, x, y, z, true, true, function() {
        mover.moveTo(camera, 0, 0, 0, false, false, function() {
          resetCamera();
          setTimeout(zoom, 1);
        });
      });
    }
  }

  function startTweet1() {
    function friendTime() {
      fwb.addTo(scene);
      active.fwb = true;

      fwb.rotate(0.10, 0, 0);
      fwb.move(-2, -1, -1);
      fwb.mode = 'zoomin';
      fwb.speed = 0.008;

      fwb.rdy = -0.03 * fwb.rdy;
      fwb.desiredZ = -3.8;
      fwb.desiredY = 0.24;

      fwb.awayVector.y = -0.01;

      spotlight.target = fwb.structure;
      //spotlight.color = new THREE.Color('rgb(255, 215, 215)'); // red
      light.color = new THREE.Color(0x300000); // soft red light
    }

    lilian.mode = 'away';
    setTimeout(function() {
      active.lilian = false;
      zoomAround(friendTime)
    }, 10000);
  }

  function startTweet2() {
    function tweet2Time() {
      active.genwife = true;
      genwife.addTo(scene);

      genwife.rotate(-0.1, 0, 0);
      genwife.move(2, -1, -1);
      genwife.mode = 'zoomin';
      genwife.speed = 0.01;

      genwife.rdy = 0.01 * genwife.rdy;
      genwife.rdx = 0.003;
      genwife.desiredZ = -4;
      genwife.desiredY = 0.5;

      genwife.awayVector.x = -0.5 * genwife.awayVector.x;

      spotlight.target = genwife.structure;
      //spotlight.color = new THREE.Color('rgb(215, 215, 255)'); // blue
      light.color = new THREE.Color(0x000030); // soft blue light
    }


    fwb.mode = 'away';
    setTimeout(function() {
      active.fwb = false;
      zoomAround(tweet2Time);
    }, 10000);
  }

  function startVp() {
    function vpTime() {
      active.vp = true;
      vp.addTo(scene);

      vp.rotate(0, 0, 0);
      vp.move(-2, 1.2, -1);
      vp.mode = 'zoomin';
      vp.speed = 0.014;

      vp.rdx = 0;
      vp.rdy = 0.002;
      vp.goCrazy();

      vp.desiredZ = -4.2;
      vp.desiredY = 0.25;

      vp.awayVector.x = -1 * vp.awayVector.x;
      vp.awayVector.y = -1 * vp.awayVector.y;

      spotlight.target = vp.structure;
      light.color = new THREE.Color(0x002020); // soft green light
    }

    genwife.mode = 'away';
    setTimeout(function() {
      active.genwife = false;
      zoomAround(vpTime);
    }, 8000);
  }

  function startLinked() {
    function linkedTime() {
      active.linked = true;
      linked.addTo(scene);

      linked.rotate(0.1, 0, 0);
      linked.move(2, 1.1, -1);
      linked.mode = 'zoomin';
      linked.speed = 0.009;

      linked.rdx = 0.005 * linked.rdy;
      linked.rdy = 0.005 * linked.rdy;
      linked.desiredZ = -5;
      linked.desiredY = 0.7;

      spotlight.target = linked.structure;
      light.color = new THREE.Color(0x200020); // soft purple light
    }

    vp.mode = 'away';
    setTimeout(function() {
      active.vp = false;
      zoomAround(linkedTime);
    }, 10000);
  }

  function addSmoke(x, y, z, num) {
    var smoke = new Smoke(x, y, z, num);
    smokestacks.push(smoke);
    smoke.addTo(scene);
    setTimeout(function() {
      smokeColor(smoke);
    }, kt.randInt(10000, 6666));
  }

  function smokeColor(smoke) {
    function smoker() {
      setTimeout(smoker, kt.randInt(6666, 2000));
      smoke.colorShift();
    }
    smoker();
  }

  function startSmoke() {
    addSmoke(-2, 0, -4, 150);
    setTimeout(function() {
      addSmoke(1.5, 0, -4, 150);
    }, 666);
    active.smoke = true;
  }

  function landscapeWarp() {
    active.landscape = true;
    warp();

    function warp() {
      if (!active.landscape) return;

      kt.brightness($canvas, kt.randInt(350, 150));
      kt.hutate($canvas, kt.randInt(360));

      setTimeout(function() {
        kt.brightness($canvas, 100);
        kt.hutate($canvas, 0);
        setTimeout(warp, kt.randInt(1200, 600));
      }, kt.randInt(350, 100));
    }

  }

  function doLilian() {
    if (!active.lilian) return;
    lilian.render();
  }

  function doFwb() {
    if (!active.fwb) return;
    fwb.render();
  }

  function doGenwife() {
    if (!active.genwife) return;
    genwife.render();
  }

  function doVp() {
    if (!active.vp) return;
    vp.render();
  }

  function doLinked() {
    if (!active.linked) return;
    linked.render();
  }

  function doLight() {
    if (!active.light) return;


  }

  function doSmoke() {
    if (!active.smoke) return;

    for (var i = 0; i < smokestacks.length; i++)
      smokestacks[i].render();
  }

  function doGold() {
    if (!active.gold) return;

    for (var i = 0; i < golds.length; i++)
      golds[i].render();
  }

  function rainGold() {
    var i = 0;
    var numGolds = kt.randInt(75, 30);
    genGold();

    setTimeout(function() {
      for (var j = 0; j < golds.length; j++) {
      //  scene.remove(golds[j]);
        golds[j].yd = 0;
      }
      //golds = [];
    }, 20000);

    function genGold() {
      var x = (Math.random() * 6) - 3; // -3 -> 3
      var y = (Math.random() * 6) - 1.5; // -1.5 -> 4.5
      var z = (Math.random() * 10) - 13; // -3 -> -13
      var r = (Math.random() * 0.3) + 0.05;
      var t = (Math.random() * 0.03) + 0.045;

      var gold = new Gold(x, y, z, r, t);
      gold.addTo(scene);
      golds.push(gold);

      setTimeout(function() {
        gold.rain();
        setTimeout(function() {
          scene.remove(gold);
        }, 10000);
      }, kt.randInt(1500, 500));

      if (++i < numGolds)
        setTimeout(genGold, kt.randInt(120, 20));
    }
  }

  function startGold() {
    active.gold = true;
    makeGold();

    function makeGold() {
      rainGold();

      setTimeout(function() {
        if (active.gold)
          makeGold();
      }, kt.randInt(40000, 20000));
    }
  }

  function startLabels() {
    active.label = true;
    makeOne();

    function makeOne() {
      var label = genLabel();
      setTimeout(function() {
        moveLabel(label);
      }, kt.randInt(2000, 500));

      setTimeout(makeOne, kt.randInt(11666, 5666));
    }
  }

  function genLabel() {
    var x = (Math.random() * 3) - 8.5;
    var y = (Math.random() * -4) - 2;
    var z = (Math.random() * 5) - 25;
    var phrase = kt.choice(phrases);
    var texture = kt.choice(textures);
    var label = new Label(x, y, z, phrase, kt.choice(textures), skybox);
    label.addTo(scene);
    return label;
  }

  function moveLabel(label) {
    move();

    function move() {
      var x = (Math.random() * 100) - 50;
      var y = (Math.random() * 60) - 30;
      var z = (Math.random() * 260) - 250;
      mover.moveTo(label.text, x, y, z, true, false, function() {
        setTimeout(function() {
          if (active.label)
            move();
        }, kt.randInt(200, 50));
      });
    }

  }

  function wrapItUp() {
    active.lilian = true;
    lilian.mode = 'rotate';
    lilian.rdx = lilian.rdy = 0.005;
    mover.moveTo(lilian.structure, -2, 1, -7, false, false, function() {
      lilian.goCrazy();
    });

    active.fwb = true;
    fwb.mode = 'rotate';
    fwb.rdx = fwb.rdy = 0.005;
    mover.moveTo(fwb.structure, -2.5, -1.2, -8, false, false, function() {
      fwb.goCrazy();
    });

    active.genwife = true;
    genwife.mode = 'rotate';
    genwife.rdx = genwife.rdy = 0.005;
    mover.moveTo(genwife.structure, 2, -1.5, -7, false, false, function() {
      genwife.goCrazy();
    });

    active.vp = true;
    vp.mode = 'rotate';
    vp.rdx = vp.rdy = 0.005;
    mover.moveTo(vp.structure, 1.7, 0, -7, false, false, function() {

    });

    linked.rdx = linked.rdy = 0.005;
    linked.goCrazy();

    // untested
    var gray = 100;
    var timer = setInterval(function() {
      var rgb = 'rgb(' + gray + ', ' + gray + ', ' + gray + ')';
      light.color = new THREE.Color(rgb);
      spotlight.position.z += 10;
      if (gray-- <= 0) {
        clearInterval(timer);

        $canvas.animate({opacity: 0}, (audio.duration - audio.currentTime) * 1000, function() {
          endgame();
        });
      }
    }, 200);

  }

});

},{"./gold":1,"./label":2,"./lib/kutility":3,"./mover":5,"./skybox":6,"./smoke":7,"./statue":8,"./world":9}],5:[function(require,module,exports){

var kt = require('./lib/kutility');

var frametime = module.exports.frametime = 20.0;

module.exports.moveTo = function zoomTo(ob, x, y, z, rotate, wait, callback) {
  var length = kt.randInt(4000, 1000);
  var numframes = length / frametime;
  var frame = 0;

  var xd = (x - ob.position.x) / numframes;
  var yd = (y - ob.position.y) / numframes;
  var zd = (z - ob.position.z) / numframes;

  if (rotate) {
    var rd = Math.random() * 0.05;
    var pd = Math.random() * 0.05;
    var wd = Math.random() * 0.05;
  } else {
    var rd = 0;
    var pd = 0;
    var wd = 0;
  }

  anim();

  function anim() {
    ob.position.x += xd;
    ob.position.y += yd;
    ob.position.z += zd;

    ob.rotation.x += rd;
    ob.rotation.y += pd;
    ob.rotation.z += wd;

    if (frame++ <= numframes)
      setTimeout(anim, frametime);
    else {
      if (wait)
        var t = kt.randInt(800, 300);
      else
        var t = 1;
      setTimeout(function() {
        callback();
      }, 1);
    }
  }
}

},{"./lib/kutility":3}],6:[function(require,module,exports){
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

},{"./lib/kutility":3}],7:[function(require,module,exports){

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

},{"./lib/kutility":3}],8:[function(require,module,exports){

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

},{"./lib/kutility":3}],9:[function(require,module,exports){

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

},{"./lib/kutility":3}]},{},[4])