
console.log("Hello");
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDGhZ6Zf7wUX-mM9Rz4AXrIJaSkVhQcpE4",
    authDomain: "char-96eb0.firebaseapp.com",
    databaseURL: "https://char-96eb0.firebaseio.com",
    projectId: "char-96eb0",
    storageBucket: "char-96eb0.appspot.com",
    messagingSenderId: "573333802169",
    appId: "1:573333802169:web:2cacedae164cfc3a93df68"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.database();
fetchFromDb();
var comment_form = document.querySelector('#comment-form');
 
function func_comment()
{
    var name = comment_form['comment-name'].value;
    var email = comment_form['comment-email'].value;
    var msg = comment_form['comment-message'].value;
    doComment(name,  msg);
    pushToDb(name, msg);
    comment_form.reset();
}
 
function doComment(name, msg)
{
    var param = document.createElement("P");
    param.appendChild(document.createTextNode(msg));

    var h = document.createElement("H4");
    h.appendChild(document.createTextNode(name));

    var l1 = document.createElement("LI");
    l1.appendChild(h);
    l1.appendChild(param);

    document.querySelector('#comment-list').appendChild(l1);
}
 
function pushToDb(name,  comment)
{
    db.ref('comments').push({
        name: name,
        comment: comment,
    })
}
 
function fetchFromDb()
{
    db.ref('comments').once('value',   function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var name = childData['name'];
            var comment = childData['comment'];
            doComment(name,  comment);
        });
    });
}