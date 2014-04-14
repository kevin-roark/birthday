$(function() {

  var kt = require('./lib/kutility');
  var Statue = require('./statue');
  var Smoke = require('./smoke');

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
  var SMOKE_TIME = 18000;
  var LANDSCAPE_TIME = 40000;

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
    setTimeout(startSmoke, SMOKE_TIME);
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
    addSmoke(-2, 0, -4, 250);
    setTimeout(function() {
      addSmoke(2, 0, -4, 250);
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
