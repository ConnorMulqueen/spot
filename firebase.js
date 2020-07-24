// TODO: [DONE] Change data structure so that it only needs 1 data read to get
// [DONE] have only one color palette lol
// [DONE] send firebase updated tile on paint
// Cache response and only re-draw the diff on listen
// listen to changes to firestore
// host on github pages


var db = connectFirebase();
function connectFirebase() {
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



  var app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore(app);
  return db;
}

// function initGrid(width, hefight) {
//   for (x=70; x<width; x++) {
//     for (y=0; y<height; y++) {
//       console.log(x,y)
//       data = {
//         location: [x,y],
//         color: colorPallete[Math.floor(Math.random()*colorPallete.length)]
//       }
//       db.collection("tiles").doc(x + ", " + y).set(data)
//     }
//   }
// }

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

function updateTileOnDB(x,y,color) {
  payload = {}
  payload[x+"_"+y]=color
  db.collection("place").doc("testing").update(payload)
}

function removeThing() {
  db.collection("place").doc("testing").update({indexName: firebase.firestore.FieldValue.delete()})
}


// function testAddTilesToDB(width, height) {

//   var docData = {}

//   for(x=0; x<width; x++) {
//     for(y=0; y<height; y++) {
//       docData[x+"_"+y] = colorPallete[Math.floor(Math.random()*colorPallete.length)]
//     }
//   }
//   console.log(docData)
//   db.collection("place").doc("testing").set(docData).then(function () {
//       console.log("Document successfully written!");
//   });
// };

function listenToDB() {
  console.log("listening...")
  let oldData = {}
  db.collection("testCollection")
    .on("value"), snap => {
      console.log(snap.value)
    }
}

function testListenToDB() {
  // db.collection("place").doc("testing").on("value", function (dataSnapshot){
  //   console.log(dataSnapshot)
  //       console.log(dataSnapshot.data())
  // })
  ref = db.collection("place").doc("testing")
  console.log(ref)

// db.collection("testCollection").doc("test").on("child_changed", function(data) {
  // console.log(data.val());
// })
}

// getAllTiles()
