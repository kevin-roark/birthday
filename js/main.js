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
