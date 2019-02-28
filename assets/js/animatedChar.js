'use strict';

//load images into an object
var images = {};

//track when the images have been loaded
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;

//select the canvas
var context = document.getElementById('canvasForChar').getContext('2d');

//this should draw on each body part
var charX = 245;
var charY = 185;

//make the character breathe
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);

function updateBreath() {
  if (breathDir === 1) {
    // breath in
    breathAmt -= breathInc;
    if (breathAmt < -breathMax) {
      breathDir = -1;
    }
  } else {
    // breath out
    breathAmt += breathInc;
    if (breathAmt > breathMax) {
      breathDir = 1;
    }
  }
}

function redraw() {
  var x = charX;
  var y = charY;

  canvasForChar.width = canvasForChar.width; // clears the canvas

  drawEllipse(x + 56, y + 67, 160 - breathAmt, 6); // shadow

  context.drawImage(images['leftArm'], x - 345, y - 100 - breathAmt);
  context.drawImage(images['legs'], x - 280, y - 118);
  context.drawImage(images['torso'], x - 280, y - 75);
  context.drawImage(images['rightArm'], x - 240, y - 45 - breathAmt);
  context.drawImage(images['head'], x - 130, y - 185 - breathAmt);
  context.drawImage(images['hair'], x - 37, y - 130 - breathAmt);

  drawEllipse(x + 68, y - 40 - breathAmt, 8, 14); // Left Eye
  drawEllipse(x + 79, y - 40 - breathAmt, 8, 14); // Right Eye
}

function drawEllipse(centerX, centerY, width, height) {
  context.beginPath();

  context.moveTo(centerX, centerY - height / 2);

  context.bezierCurveTo(
    centerX + width / 2,
    centerY - height / 2,
    centerX + width / 2,
    centerY + height / 2,
    centerX,
    centerY + height / 2
  );

  context.bezierCurveTo(
    centerX - width / 2,
    centerY + height / 2,
    centerX - width / 2,
    centerY - height / 2,
    centerX,
    centerY - height / 2
  );

  context.fillStyle = 'black';
  context.fill();
  context.closePath();
}

function resourceLoaded() {
  numResourcesLoaded += 1;
  if (numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

function loadImage(name) {
  images[name] = new Image();
  images[name].onload = function() {
    resourceLoaded();
  };
  images[name].src = 'assets/images/' + name + '.png';
}

loadImage('leftArm');
loadImage('legs');
loadImage('torso');
loadImage('rightArm');
loadImage('head');
loadImage('hair');
