const { db } = require('../configs/config')

module.exports = {
  async getAllDataByName (req, res) {
    const dataRef = await db.ref("User/"+req.body.name).once("value")
    const doc = dataRef.val()

    if(doc == null){
      return res.status(400).send({
        error : "This user does not exists"
      })
    }
    else {
      return res.send({
        data: doc
      })
    }
  }
}