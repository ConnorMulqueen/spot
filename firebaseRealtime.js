
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



var commentsRef = firebase.database().ref().child('/tiles/')


// commentsRef.on('child_added', function(data) {
//   // addCommentElement(postElement, data.key, data.val().text, data.val().author);
//   console.log('child_added ', data.val())
//   let tile = data.val()
//   addTile(tile.x, tile.y, tile.color)
// });


commentsRef.on('child_changed', function(data) {
  // addCommentElement(postElement, data.key, data.val().text, data.val().author);
  console.log('child_changed ', data.val())
  let tile = data.val()
  addTile(tile.x, tile.y, tile.color)
  draw()
});

function readData() {
  return firebase.database().ref('/testCollection/asdf').once('value').then(function(snapshot) {
    console.log('worked')
    console.log(snapshot.val())
    // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });
}
const colorPallete = [
  "white",
  "light grey",
  "grey",
  "black",
  "pink",
  "red",
  "orange",
  "brown",
  "yellow",
  "light green",
  "green",
  "cyan",
  "medium blue",
  "dark blue",
  "light purple",
  "dark purple"
]
function addTiles(width,height) {
  for(x=0; x<width; x++) {
    for(y=0; y<height; y++) {
      writeTile(x,y,colorPallete[Math.floor(Math.random()*colorPallete.length)])
    }
  }
}

function writeTile(x,y,color) {
  firebase.database().ref('/tiles/' + 'tile_'+x+'_'+y).set({
    x: x,
    y: y,
    color : color
  });
}

function getAllTiles() {
  db.collection("place").doc("testing").get().then(function(doc) {
    if (doc.exists) {
       data = doc.data()
       console.log(doc.data())
        for (var i in data) {
          x = parseInt(i.substr(0,i.indexOf('_')))
          y = parseInt(i.substr(i.indexOf('_')+1))
          addTile(x, y, data[i])
        }
        draw()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}


function initDB() {
  return firebase.database().ref('/tiles/').once('value').then(function(snapshot) {
    tiles = snapshot.val()
    // console.log(snapshot.val())
    for (index in tiles) {
      tile = tiles[index]
      addTile(tile.x,tile.y, tile.color)
    }
  }).then(function (_) {
    draw()
  });
}

initDB()