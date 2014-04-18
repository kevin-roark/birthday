
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
