'use strict';

//load images into an object
var images = {};

//track when the images have been loaded
var totalResources = 10;
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

//blinking
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);

//noose interaction
var nooseStartingPoint = 800;
var nooseToNeck = nooseStartingPoint;
var guess1 = 700;
var guess2 = 625;
var guess3 = 525;
var guess4 = 550;
var guess5 = 555;
var guess6 = 565;
var jumping = false;
// console.log(nooseToNeck);

document.onclick = event => {
  setTimeout(hangTheMan, 10);
  // console.log(jumping);
};

function hangTheMan() {
  // console.log($('#guessesLeft').text());
  if ($('#guessesLeft').text() == 6) {
    lowerNoose(guess1);
  } else if ($('#guessesLeft').text() == 5) {
    lowerNoose(guess2);
  } else if ($('#guessesLeft').text() == 4) {
    lowerNoose(guess3);
  } else if ($('#guessesLeft').text() == 3) {
    raiseNoose(guess4);
  }
}

function lowerNoose(stoppingPoint) {
  if (nooseToNeck > stoppingPoint) {
    nooseToNeck -= 1;
    setTimeout(lowerNoose, 10, stoppingPoint);
  }
}

function raiseNoose(stoppingPoint) {
  if (nooseToNeck < stoppingPoint) {
    nooseToNeck += 1;
    setTimeout(raiseNoose, 10, stoppingPoint);
  }
}

function updateBlink() {
  eyeOpenTime += blinkUpdateTime;

  if (eyeOpenTime >= timeBtwBlinks) {
    blink();
  }
}

function blink() {
  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
    eyeOpenTime = 0;
    curEyeHeight = maxEyeHeight;
  } else {
    setTimeout(blink, 10);
  }
}

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

  //start struggling
  if ($('#guessesLeft').text() <= 2) {
    jumping = true;
  }

  var jumpHeight = 45;

  canvasForChar.width = canvasForChar.width; // clears the canvas

  // shadow
  if (jumping) {
    drawEllipse(x + 56, y + 97, 100 - breathAmt, 4);
  } else {
    drawEllipse(x + 56, y + 97, 160 - breathAmt, 6);
  }

  if (jumping) {
    y -= jumpHeight;
  }
  //   console.log(jumping);
  if (jumping) {
    context.drawImage(images['leftArm-bent'], x - 153, y - 55 - breathAmt);
    context.drawImage(images['legs-dangle'], x - 195, y + 50);
    context.drawImage(images['torso'], x - 280, y - 45);
    context.drawImage(images['noose'], x - 320, y - nooseToNeck - breathAmt);
    context.drawImage(images['rightArm-bent'], x - 175, y - 70 - breathAmt);
    context.drawImage(images['head'], x - 130, y - 155 - breathAmt);
    context.drawImage(images['hair'], x - 37, y - 100 - breathAmt);

  } else {
    context.drawImage(images['leftArm'], x - 345, y - 70 - breathAmt);
    context.drawImage(images['legs'], x - 280, y - 88);
    context.drawImage(images['torso'], x - 280, y - 45);
    context.drawImage(images['rightArm'], x - 240, y - 15 - breathAmt);
    context.drawImage(images['noose'], x - 320, y - nooseToNeck - breathAmt);
    context.drawImage(images['head'], x - 130, y - 155 - breathAmt);
    context.drawImage(images['hair'], x - 37, y - 100 - breathAmt);

  }




  drawEllipse(x + 68, y - 10 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 79, y - 10 - breathAmt, 8, curEyeHeight); // Right Eye
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
  images[name].onload = function () {
    resourceLoaded();
  };
  images[name].src = 'assets/images/' + name + '.png';
}

loadImage('leftArm-bent');
loadImage('rightArm-bent');
loadImage('legs-dangle');

loadImage('leftArm');
loadImage('legs');
loadImage('torso');
loadImage('rightArm');
loadImage('noose');
loadImage('head');
loadImage('hair');
