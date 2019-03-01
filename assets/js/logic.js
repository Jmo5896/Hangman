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
  var lettersLeft = [
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
  const wordBank = ['html', 'css', 'javascript', 'jquery', 'pikachu', 'swablu'];
  let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  database.ref('pokemon').on('value', function (snapshot) {
    console.log(snapshot.val()[Math.floor(Math.random() * 800)].name);
    
  });
  // console.log(generatePokemon);
  let wins = 0;
  let losses = 0;
  let guessesLeft = 7;
  let guessedLetters = [];
  let lettersInWord = [];
  let lettersAndBlanks = [];
  // Variables===========================================

  // Functions===========================================
  function reset() {
    lettersInWord = [];
    lettersAndBlanks = [];
    //choose new word
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    //reset guessesLeft
    guessesLeft = 7;
    //reset current arrays
    guessedLetters = [];
    lettersInWord = randomWord.split('');
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
    console.log(randomWord);
    // console.log(lettersInWord);

    //generate html
    $('#wins').text(wins);
    $('#losses').text(losses);
    $('#guessesLeft').text(guessesLeft);
    $('#lettersAndSpaces').text(lettersAndBlanks.join(' '));
    $('#letterCardsInATable').empty();
    nooseToNeck = nooseStartingPoint;
    jumping = false;
    populateLetterButtons();
  }
  function populateLetterButtons() {
    //populate buttons inside a table
    let newTr = $('<tr>');
    for (let i = 0; i < lettersLeft.length; i++) {
      if (i === 0 || i % 7 === 0) {
        newTr = $('<tr>');
        newTr.append(`
          <td>
            <div class="card rounded p-2 mx-auto letters" data-name="${
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
            <div class="card rounded p-2 mx-auto letters" data-name="${
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
  // Functions===========================================

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
      setTimeout(roundState, 100);
    }
  });
  reset();
  // Main Logic==========================================

  //DO NOT CODE BENEATH THIS LINE
});
