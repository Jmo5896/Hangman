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
  console.log(database);
  
  database.ref().set({
      1: 'word'
  });

  var loadTheseWords = {};