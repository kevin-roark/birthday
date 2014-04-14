$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  //var audio = document.querySelector('#audio');
  //var $aud = $(audio);

  var lilian = document.querySelector('#lilian');
  var $lilian = $(lilian);
  var lilStatue = {
    dom: lilian,
    jq: $lilian,
    shadowColor: 'rgb(255, 200, 40)',
    deg: 0,
  };

  var vids = [];
  var $vids = [];

  var numMedia = vids.length; // number of things to load
  var mediasReady = 0;

  var active = {};

  var names = [];
  var nameMap = {};
  var $nameMap = {};

  var AUDIO_LENGTH = 100000;

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
    startVids();
    setPerspectives();
    startLilian();

    setTimeout(hideFooter, 1000);

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

  function startVids() {
    for(var i = 0; i < vids.length; i++) {
      vids[i].play();
      vids[i].loop = true;
    }
  }

  function setPerspectives() {
    kt.perp($lilian, kt.randInt(500, 100));
  }

  function spintate(axis, statue) {
    statue.deg = statue.deg + 1;
    if (axis == 'x') {
      kt.rotate3dx(statue.jq, statue.deg);
    } else if (axis == 'y') {
      kt.rotate3dy(statue.jq, statue.deg);
    } else { // axis == 'z'
      kt.rotate3dz(statue.jq, statue.deg);
    }

    setTimeout(function() {
      spintate(axis, statue);
    }, 40);
  }

  function startLilian() {
    kt.shadow($lilian, 3, 3, kt.randInt(20, 5), kt.randInt(20, 5), lilStatue.shadowColor);
    $lilian.fadeIn(16000, function() {
      spintate('y', lilStatue);
    });
  }


});
