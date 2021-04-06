const { db } = require('../configs/config')
const { avgTemp } = require('./Utils')
const { diffDate } = require('./Utils')

module.exports = {
  async getAllDataByName (req, res) {
    try{
      let graphLabels = []
      let graphValues = []
      let tempArray = []
      let allTemp = []
      let uniqueIDForTable = 0

      // Get all data from db
      await db.ref("User/"+req.body.name).once('value').then(function(data){

        // Get all graph's label & calculate table
        data.forEach(dataSnapshot => {

          // Get all graph's label
          if (!graphLabels.includes(dataSnapshot.val().date)) {
            graphLabels.push(dataSnapshot.val().date)
          }

          // Calculate table
          let tempObj = {}
          let temp = parseFloat(dataSnapshot.val().temp)
          tempObj["id"] = uniqueIDForTable
          tempObj["date"] = dataSnapshot.val().date
          tempObj["temp"] = temp.toFixed(1)
          allTemp.push(tempObj)
          uniqueIDForTable++
        })

        // Calculate graph
        let count = 0
        data.forEach(dataSnapshot => {
          if (dataSnapshot.val().date == graphLabels[count]) {
            tempArray.push(dataSnapshot.val().temp)
          } else {
            graphValues.push(avgTemp(tempArray))

            tempArray = []
            count++
            tempArray.push(dataSnapshot.val().temp)
          }
        })
        graphValues.push(avgTemp(tempArray))
      })

      // Get difference date
      const movingAvg = diffDate(graphLabels)

      res.status(200).send({
        graphLabels: graphLabels,
        graphValues: graphValues,
        allTemp: allTemp,
        movingAvg: movingAvg
      })
    }catch (err) {
      res.status(500).send({
        message: 'Internal Server Error',
      });
      console.log(err);
    }
  },
  async getAllName (req, res) {
    try{
      let nameList = []
      await db.ref("User/").once("value").then(function(dataSnapshot) {
        dataSnapshot.forEach(function(childSnapshot) {
          nameList.push(childSnapshot.key);
        })
      })

      return res.status(200).send({
        data: nameList
      })
    }catch (err) {
      res.status(500).send({
        message: 'Internal Server Error',
      });
      console.log(err);
    }
  },
  async createNewUser (req, res) {
    try{
      let username = req.body.name
      let temp = req.body.temp
      let timestamp = Date.now();
      let fullDateTime = new Date(timestamp)
      let date = fullDateTime.toString().split(" ")
      let dateReFormat = date[2] +"-"+ date[1] +"-"+ date[3]
      const data = {
        [username]:{
          [timestamp]: {
              temp: temp,
              date: dateReFormat
            }
        }
      };
      await db.ref("User/").update(data);
      
      res.status(200).send({
        message: "Created new user."
      })

    }catch (err) {
      res.status(500).send({
        message: 'Internal Server Error',
      });
      console.log(err);
    }
  },
  async updateUserTemp (req, res) {
    try{
      let username = req.body.name
      let temp = req.body.temp
      let timestamp = Date.now();
      let fullDateTime = new Date(timestamp)
      let date = fullDateTime.toString().split(" ")
      let dateReFormat = date[2] +"-"+ date[1] +"-"+ date[3]
      const data = {
        [timestamp] : {
          temp : temp,
          date : dateReFormat
        }
      }
      await db.ref("User/"+username).update(data)

      res.status(200).send({
        message: "Updated."
      })
    }catch (err) {
      res.status(500).send({
        message: 'Internal Server Error',
      });
      console.log(err);
    }
  }
}