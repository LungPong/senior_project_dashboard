const firebase = require("firebase")

firebase.initializeApp({
  apiKey: "AIzaSyCPyU9speSkRCizTHG8aUKkjPH_3pAvhpI",
  authDomain: "vue-dashboard-wtfss.firebaseapp.com",
  databaseURL: "https://vue-dashboard-wtfss-default-rtdb.firebaseio.com",
  projectId: "vue-dashboard-wtfss",
  storageBucket: "vue-dashboard-wtfss.appspot.com",
  messagingSenderId: "837863145537",
  appId: "1:837863145537:web:3711909f000a3aa91cc6c0"
});

const db = firebase.database();

module.exports = {
  db,
  port: process.env.PORT || 9070
}
