const firebase = require("firebase")

firebase.initializeApp({
  // Your web app's Firebase configuration
});

const db = firebase.database();

module.exports = {
  db,
  port: process.env.PORT || 9070
}
