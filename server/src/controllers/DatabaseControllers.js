const { db } = require('../configs/config')
const { avgTemp } = require('./Utils')

module.exports = {
  async getAllDataByName (req, res) {
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

    return res.send({
      graphLabels: graphLabels,
      graphValues: graphValues,
      allTemp: allTemp
    })
  },
  async getAllName (req, res) {
    let nameList = []
    await db.ref("User/").once("value").then(function(dataSnapshot) {
      dataSnapshot.forEach(function(childSnapshot) {
        nameList.push(childSnapshot.key);
      })
    })

    return res.send({
      data: nameList
    })
  }
}