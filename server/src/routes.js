const DatabaseController = require('./controllers/DatabaseControllers')

module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}!, Your account was registered! Have fun!`
    })
  })

  app.post('/user', DatabaseController.getAllDataByName)
  app.get('/user', DatabaseController.getAllName)
}