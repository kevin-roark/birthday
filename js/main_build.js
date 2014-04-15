(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility');
  var Statue = require('./statue');
  var Smoke = require('./smoke');
  var World = require('./world');
  var sb = require('./skybox');
  var skybox = sb.skybox;
  var cubemap = sb.cubemap;

  //var audio = document.querySelector('#audio');
  //var $aud = $(audio);

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

  var renderer;
  if (window.WebGLRenderingContext)
    renderer = new THREE.WebGLRenderer();
  else
    renderer = new THREE.CanvasRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x333333, 1);
	document.body.appendChild(renderer.domElement);

  var canvas = document.querySelector('canvas');
  var $canvas = $(canvas);

  scene.add(skybox);

  var spotlight = new THREE.SpotLight(0xffffff, 1.6, 1000);
  spotlight.position.set(0, 100, 250);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 2;
  spotlight.exponent = 5.0;
  spotlight.shadowDarkness = 0.8;
  scene.add(spotlight);

  var lilian = new Statue('media/lilian.png', cubemap, 2, 0.7, 2);
  var fwb = new Statue('media/fwb.png', cubemap, 2, 1.5, 1.8);

  var smokestacks = [];

  var vids = [];
  var $vids = [];

  var numMedia = vids.length; // number of things to load
  var mediasReady = 0;

  var active = {};

  var names = [];
  var nameMap = {};
  var $nameMap = {};

  var AUDIO_LENGTH = 100000;
  var WORLD_TIME = 28000;
  var TWEET1_TIME = 45000;
  var SMOKE_TIME = 94000;
  var TWEET2_TIME = 115000;
  var LANDSCAPE_TIME = 140000;

  for (var i = 0; i < vids.length; i++)
    vids[i].addEventListener('canplaythrough', mediaReady);

  function mediaReady() {
    mediasReady++;
    if (mediasReady == numMedia) {
      start();
    }
  }

  start();

  function start() {

    //audio.play();

    doLight();

    startLilian();
    render();

    setTimeout(hideFooter, 1000);
    setTimeout(addWorld, WORLD_TIME);
    setTimeout(startTweet1, TWEET1_TIME);
    setTimeout(startSmoke, SMOKE_TIME);
    setTimeout(startTweet2, TWEET2_TIME);
    setTimeout(landscapeWarp, LANDSCAPE_TIME);

    soundControl();

    setInterval(function() {
      //$('.debug-timer').html(audio.currentTime);
    }, 200);
  }

  function endgame() {

    function restart() {

      //audio.currentTime = 0;
      for (var i = 0; i < vids.length; i++)
        vids[i].currentTime = 0;

      start();
    }

    function showFooter() {
      $('.footer').animate({
        opacity: 1.0
      }, 600);

      $('.footer').unbind('mouseenter');
      $('.footer').unbind('mouseleave');
    }

    showFooter();
    setTimeout(restart, 5000);
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
    for (var i = 0; i < vids.length; i++)
      vids[i].muted = true;
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
    doFwb();

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
    spotlight.color = new THREE.Color('rgb(255, 255, 180)'); // gold
  }

  function resetCamera() {
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
  }

  function zoomAround(callback) {
    var zooms = 0;
    var max = kt.randInt(5, 3);
    var frametime = 20.0;
    zoom();

    function zoomTo(x, y, z, rotate, callback) {
      var length = kt.randInt(4000, 1000);
      var numframes = length / frametime;
      var frame = 0;

      var xd = (x - camera.position.x) / numframes;
      var yd = (y - camera.position.y) / numframes;
      var zd = (z - camera.position.z) / numframes;

      if (rotate) {
        var rd = Math.random() * 0.05;
        var pd = Math.random() * 0.05;
        var yd = Math.random() * 0.05;
      } else {
        var rd = 0;
        var pd = 0;
        var yd = 0;
      }

      anim();

      function anim() {
        camera.position.x += xd;
        camera.position.y += yd;
        camera.position.z += zd;

        camera.rotation.x += rd;
        camera.rotation.y += pd;
        camera.rotation.z += yd;

        if (frame++ <= numframes)
          setTimeout(anim, frametime);
        else {
          setTimeout(function() {
            callback();
          }, kt.randInt(1000, 500));
        }
      }
    }

    function zoom() {
      zooms++;
      if (zooms == max) {
        zoomTo(0, 0, 0, false, function() {
          resetCamera();
          callback();
        });
        return;
      }

      var x = (Math.random() * 40) - 20;
      var y = (Math.random() * 25) - 12.5;
      var z = (Math.random() * 4) - 34;
      var rotate = false; //(zooms == 1)? false : true;
      zoomTo(x, y, z, rotate, function() {
        zoomTo(0, 0, 0, false, function() {
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
      fwb.move(0, 0.75, -1);
      fwb.mode = 'zoomin';
      fwb.speed = 0.005;

      fwb.rdy = -1 * fwb.rdy;
      fwb.awayVector.y = -0.01;

      spotlight.target = fwb.structure;
      spotlight.color = new THREE.Color('rgb(255, 150, 140)'); // red
    }

    lilian.mode = 'away';
    setTimeout(function() {
      active.lilian = false;
      zoomAround(friendTime)
    }, 10000);
  }

  function startTweet2() {
    function tweet2Time() {
      console.log('lets go');
    }


    fwb.mode = 'away';
    setTimeout(function() {
      active.fwb = false;
      zoomAround(tweet2Time);
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
        setTimeout(warp, kt.randInt(800, 200));
      }, kt.randInt(300, 60));
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

  function doLight() {
    setTimeout(doLight, kt.randInt(4000, 500));
  }

  function doSmoke() {
    if (!active.smoke) return;

    for (var i = 0; i < smokestacks.length; i++)
      smokestacks[i].render();
  }


});

},{"./lib/kutility":1,"./skybox":3,"./smoke":4,"./statue":5,"./world":6}],3:[function(require,module,exports){
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
console.log(cubemap);

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

},{"./lib/kutility":1}],4:[function(require,module,exports){

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

},{"./lib/kutility":1}],5:[function(require,module,exports){

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
    this.speed = Math.max(DEFAULT_SPEED, DEFAULT_SPEED * Math.abs(this.structure.position.z) * 0.8);
    if (this.structure.position.z <= this.zbackthresh) {
      this.mode = 'zoomback';
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

},{"./lib/kutility":1}],6:[function(require,module,exports){

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

},{"./lib/kutility":1}]},{},[2])