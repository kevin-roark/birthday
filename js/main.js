$(function() {

  var kt = require('./lib/kutility');
  var Statue = require('./statue');
  var Smoke = require('./smoke');
  var World = require('./world');

  //var audio = document.querySelector('#audio');
  //var $aud = $(audio);

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x333333, 1);
	document.body.appendChild(renderer.domElement);

  var canvas = document.querySelector('canvas');
  var $canvas = $(canvas);

  var spotlight = new THREE.SpotLight(0xffffff, 1.6, 1000);
  spotlight.position.set(0, 100, 250);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 2;
  spotlight.exponent = 5.0;
  spotlight.shadowDarkness = 0.8;
  scene.add(spotlight);

  var lilian = new Statue('media/lilian.png', 2, 0.7, 2);

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
  var SMOKE_TIME = 32000;
  var LANDSCAPE_TIME = 55000;
  var TWEET1_TIME = 30000;

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

    var world = new World();
    world.addTo(scene);

    doLight();

    startLilian();
    render();

    setTimeout(hideFooter, 1000);
    setTimeout(startSmoke, SMOKE_TIME);
    setTimeout(landscapeWarp, LANDSCAPE_TIME);
    setTimeout(startTweet1, TWEET1_TIME);

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

    renderer.render(scene, camera);
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
    var max = kt.randInt(8, 4);
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

      var x = (Math.random() * 15) - 7.5;
      var y = (Math.random() * 15) - 7.5;
      var z = (Math.random() * 10) - 40;
      var rotate = false; //(zooms == 1)? false : true;
      zoomTo(x, y, z, rotate, function() {
        zoomTo(0, 0, 0, false, function() {
          setTimeout(zoom, 1);
        });
      });
    }

  }

  function startTweet1() {

    function believe() {
      console.log('bring in another');
    }

    lilian.mode = 'away';
    setTimeout(function() {
      zoomAround(believe)
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
    if (!active.lilian) false;

    if (lilian.mode == 'zoomin') {
      lilian.move(0, 0, -1 * lilian.speed);
      lilian.speed = Math.max(0.005, 0.005 * Math.abs(lilian.structure.position.z) * 0.8);
      if (lilian.structure.position.z <= -50.0) {
        lilian.mode = 'zoomback';
      }
    } else if (lilian.mode == 'zoomback') {
      lilian.move(0, 0, lilian.speed);
      lilian.speed = 0.5;
      if (lilian.structure.position.z >= -5.0) {
        lilian.mode = 'rotate';
      }
    } else if (lilian.mode == 'rotate') {
      lilian.rotate(0, 0.01);
    } else if (lilian.mode == 'away') {
      var x = Math.random() * 0.3 - 0.05;
      var y = Math.random() * 0.2 - 0.05;
      var z = Math.random() * -0.2 - 0.05;
      lilian.move(x, y, z);
      if (lilian.structure.position.z <= -60.0) {
        lilian.mode = 'gone';
        active.lilian = false;
      }
    }
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
