var config = {
   apiKey: "AIzaSyDzbICBt47v_tXOh8C11qdvu-2HfNgWIKM",
   authDomain: "bootcamp-d868c.firebaseapp.com",
   databaseURL: "https://bootcamp-d868c.firebaseio.com",
   projectId: "bootcamp-d868c",
   storageBucket: "bootcamp-d868c.appspot.com",
   messagingSenderId: "800062682778"
 };

 firebase.initializeApp(config);


var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
 event.preventDefault();

 var trainName = $("#train-name-input").val().trim();
 var destination = $("#destination-input").val().trim();
 var trainTime = $("#time-input").val();
 var trainFreq = $("#frequency-input").val();

console.log(trainTime);

 var newTrain = {
   name: trainName,
   destination: destination,
   time: trainTime,
   frequency: trainFreq
 };

 database.ref().push(newTrain);


 console.log(newTrain.name);
 console.log(newTrain.destination);
 console.log(newTrain.time);
 console.log(newTrain.frequency);




 $("#train-name-input").val("");
 $("#destination-input").val("");
 $("#time-input").val("");
 $("#frequency-input").val("");


 return false;
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

 console.log(childSnapshot.val());

 var trainName = childSnapshot.val().name;
 var destination = childSnapshot.val().destination;
 var trainTime = childSnapshot.val().time;
 var trainFreq = childSnapshot.val().frequency;


 console.log(trainName);
 console.log(destination);
 console.log(trainTime);
 console.log(trainFreq);

var nextTrain = moment(trainTime, "HH:mm");
var currentTime = moment();

while(nextTrain < currentTime) {
   nextTrain.add(trainFreq, "minutes");
}


console.log('nextTrain:',nextTrain.format("HH:mm"));

var timeDiff = nextTrain.diff(currentTime, "minutes"); 

console.log(timeDiff);


 $("#train-table > tbody").append(
   "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
 trainFreq + "</td><td>" + nextTrain.format("hh:mm a") + "</td><td>" + timeDiff + "</td><td>");
});