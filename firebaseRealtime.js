
var db = connectFirebase();
function connectFirebase() {
  console.log("connecting...")
  var firebaseConfig = {
    apiKey: "AIzaSyCT-nWZttxI11ea-H9a2SW3iNKMP9pOFOE",
    authDomain: "place-9c500.firebaseapp.com",
    databaseURL: "https://place-9c500.firebaseio.com",
    projectId: "place-9c500",
    storageBucket: "place-9c500.appspot.com",
    messagingSenderId: "863156558290",
    appId: "1:863156558290:web:ca4701a7143bb8c2fb500b",
    measurementId: "G-5G17632L0D"
  };
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  var db = firebase.database();
  return db;
}

db.ref().child('/tiles/').on('child_changed', function(data) {
  console.log('child_changed ', data.val())
  let tile = data.val()
  addTile(tile.x, tile.y, tile.color)
  draw()
});

function writeTile(x,y,color) {
  db.ref('/tiles/' + 'tile_'+x+'_'+y).set({
    x: x,
    y: y,
    color : color
  });
}

function initDB() {
  return db.ref('/tiles/').once('value').then(function(snapshot) {
    tiles = snapshot.val()
    // console.log(snapshot.val())
    for (index in tiles) {
      tile = tiles[index]
      addTile(tile.x,tile.y, tile.color)
    }
  }).then(_ => {
    console.log('finished loading')
    document.getElementById("loader").style.display = 'none'
    document.getElementById("loaded").style.display= 'inline'
    draw()
  });
}

initDB()