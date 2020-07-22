var db = connectFirebase();
function connectFirebase() {
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  var app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore(app);
  return db;
}

var colorPallete = ['white', 'light grey', 'grey', 'black', 'pink', 'red', 'orange',
              'brown', 'yellow', 'light green', 'green', 'cyan', 'medium blue', 'dark blue', 'light purple', 'dark purple']
function initGrid(width, height) {
  for (x=10; x<width; x++) {
    for (y=0; y<height; y++) {
      console.log(x,y)
      data = {
        location: [x,y],
        color: colorPallete[Math.floor(Math.random()*colorPallete.length)]
      }
      db.collection("tiles").doc(x + ", " + y).set(data)
    }
  }
}

var data
function getTiles() {
  var docRef = db.collection("tiles").doc("tile");

  docRef.get().then(function(doc) {
      if (doc.exists) {
        // let tile = doc.data();
        return doc.data();
        // drawTile(tile["location"][0], tile["location"][1], tile["color"])
      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}


var allTiles = []
function getAllTiles() {
  db.collection("tiles").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        allTiles.push(doc.data());
    });
  });
}

function drawTiles() {
  allTiles.forEach( (tile) => {
    console.log("drawing tile --", tile)
    drawTile(tile["location"]["0"], tile["location"]["1"], tile["color"])
  });
}