'use strict';

$(document).ready(() => {
  //firebase stuff=========================================

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyAxW2iGmglxkvddLyhztgU1Ar2TCl1GQJQ',
    authDomain: 'hangman-eb602.firebaseapp.com',
    databaseURL: 'https://hangman-eb602.firebaseio.com',
    projectId: 'hangman-eb602',
    storageBucket: '',
    messagingSenderId: '810295666509'
  };
  firebase.initializeApp(config);

  let database = firebase.database();
  //firebase stuff========================================= 

  // Variables===========================================
  const letterChoice = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  let lettersLeft = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  let wins = 0;
  let losses = 0;
  let guessesLeft = 7;
  let guessedLetters = [];
  let lettersInWord = [];
  let lettersAndBlanks = [];
  // Variables===========================================

  //functions============================================
  function populateLetterButtons() {
    //populate buttons inside a table
    let newTr = $('<tr>');
    for (let i = 0; i < lettersLeft.length; i++) {
      if (i === 0 || i % 7 === 0) {
        newTr = $('<tr>');
        newTr.append(`
        <td>
          <div class="card rounded mx-auto letters" data-name="${
          lettersLeft[i]
          }" data-state="false">
            <div class="card-body" >
              <h5 class="text-center">${lettersLeft[i].toUpperCase()}</h5>
            </div>
          </div>
        </td>
        `);
      } else {
        newTr.append(`
        <td>
          <div class="card rounded mx-auto letters" data-name="${
          lettersLeft[i]
          }" data-state="false">
            <div class="card-body" >
              <h5 class="text-center">${lettersLeft[i].toUpperCase()}</h5>
            </div>
          </div>
        </td>
        `);
      }
      $('#letterCardsInATable').append(newTr);
    }
  }

  function guessALetter(guess) {
    guessedLetters.push(guess);

    // $('#lettersGuessed').text(guessedLetters.join(', '));
    if (lettersInWord.includes(guess)) {
      lettersInWord.forEach((letter, index) => {
        if (letter === guess) {
          lettersAndBlanks[index] = guess;
        }
      });
      // console.log(lettersInWord);
      // console.log(lettersAndBlanks);
      $('#lettersAndSpaces').text(lettersAndBlanks.join(' '));
    } else {
      guessesLeft--;
      $('#guessesLeft').text(guessesLeft);
    }
    // console.log(guess);
  }
  //functions============================================

  //wrapped ALL other logic in this callback so that it waits for the word to be loaded
  database.ref('pokemon').on('value', function (snapshot) {
    let randomWord = snapshot.val()[Math.floor(Math.random() * 672)].name;
    // console.log('initial randomWord: ' + randomWord);

    function reset() {
      lettersInWord = [];
      lettersAndBlanks = [];
      randomWord = snapshot.val()[Math.floor(Math.random() * 672)].name; //reset HAS TO live inside because of this line
      guessesLeft = 7;
      guessedLetters = [];
      lettersInWord = randomWord.split('');
      // console.log(lettersInWord);
      lettersInWord.forEach(letter => {
        lettersAndBlanks.push('_');
      });
      lettersLeft = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ];
      // console.log(lettersLeft);
      // console.log('reset func randomWord: ' + randomWord);
      // console.log(lettersInWord);

      //generate html
      $('#wins').text(wins);
      $('#losses').text(losses);
      $('#guessesLeft').text(guessesLeft);
      $('#lettersAndSpaces').text(lettersAndBlanks.join(' '));
      $('#letterCardsInATable').empty();
      nooseToNeck = nooseStartingPoint;
      jumping = false;
      struggling = false;
      dead = false;
      populateLetterButtons();
    }

    //must live inside because it calls both reset and randomWord
    function roundState() {
      if (lettersAndBlanks.join('') === lettersInWord.join('')) {
        alert('You win!!!, the word was\n' + randomWord);
        wins++;
        reset();
      } else if (guessesLeft === 0) {
        alert('You Lose!!!, the word was\n' + randomWord);
        losses++;
        reset();
      }
    }

    // Main Logic==========================================

    // //using the keyboard to type
    // document.onkeyup = event => {
    //   let guess = event.key;
    //   if (letterChoice.includes(guess) && !guessedLetters.includes(guess)) {
    //     guessALetter(guess);
    //     setTimeout(roundState, 100);
    //   }
    //   //if a keyboard letter is hit
    //   if (guess === $that) {
    //   }
    // };

    //clicking the cards
    $('#letterCardsInATable').on('click', '.letters', function () {
      //change the color when card is clicked
      let that = this;
      $(that).attr('data-state', true);
      if ($(that).data('state')) {
        $(that).addClass('bg-secondary');
      }
      let guess = $(that).data('name');
      if (!guessedLetters.includes(guess)) {
        guessALetter(guess);
        setTimeout(roundState, 50);
      }
    });
    reset();
    // Main Logic==========================================
  });
  //DO NOT CODE BENEATH THIS LINE
});
