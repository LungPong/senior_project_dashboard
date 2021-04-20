const DatabaseController = require('./controllers/DatabaseControllers')

module.exports = (app) => {
  app.get('/user', DatabaseController.getAllName)
  app.post('/user', DatabaseController.getAllDataByName)
  app.put('/user', DatabaseController.updateUserTemp)

  app.post('/create', DatabaseController.createNewUser)
}