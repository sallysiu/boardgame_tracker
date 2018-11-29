import firebase from "firebase";

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCuEjlOebnz8Q9A30OiLadppaujYvTzeLU",
	authDomain: "boardgame-tracker-918ee.firebaseapp.com",
	databaseURL: "https://boardgame-tracker-918ee.firebaseio.com",
	projectId: "boardgame-tracker-918ee",
	storageBucket: "",
	messagingSenderId: "1058475483080"
};
firebase.initializeApp(config);

export default firebase;