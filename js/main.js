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
