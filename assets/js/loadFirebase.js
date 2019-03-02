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

  $.ajax({
    url: 'assets/pokemonWordBank/pokemon.csv',
    dataType: 'text',
  }).done(successFunction);
  
  
  var csvData = [];
  var pokemonList = [];
  var pokemonListOfObjects = [];

  function successFunction(data) {
    var allRows = data.split(/\r?\n|\r/);//makes each row a string

    //converts the strings into arrays and adds it to csvData
    allRows.forEach(row => {
      let currentRow = row.split(',');
      csvData.push(currentRow);
    });

    //removes the first array because it is the labels from the csv
    csvData.splice(0,1);

    //cut out everything but the name, leaving a list of strings
    csvData.forEach(array => {
      let pokemon = array.splice(1,1).pop();
      console.log('pokemon: ' + pokemon)
      if (!pokemon==undefined) {
        if (!pokemon.includes(' ')) {
          pokemonList.push(pokemon.toLowerCase());
        }
      }
    });
    console.log(pokemonList);
      
    //pushes names to database
    for (let i = 0; i < pokemonList.length; i++) {
      database.ref('pokemon').child(i).set({name: pokemonList[i]});
    }
    

  }