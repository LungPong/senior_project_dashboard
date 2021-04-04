const firebase = require("firebase")

firebase.initializeApp({
  apiKey: "AIzaSyCPyU9speSkRCizTHG8aUKkjPH_3pAvhpI",
  authDomain: "vue-dashboard-wtfss.firebaseapp.com",
  projectId: "vue-dashboard-wtfss",
  storageBucket: "vue-dashboard-wtfss.appspot.com",
  messagingSenderId: "837863145537",
  appId: "1:837863145537:web:c0cb9647ca5b373b1cc6c0"
});

const db = firebase.database();

module.exports = {
  db,
  port: process.env.PORT || 9070
}