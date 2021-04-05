const DatabaseController = require('./controllers/DatabaseControllers')

module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}!, Your account was registered! Have fun!`
    })
  })

  app.get('/user', DatabaseController.getAllName)
  app.post('/user', DatabaseController.getAllDataByName)
  app.put('/user', DatabaseController.updateUserTemp)

  app.post('/create', DatabaseController.createNewUser)
}