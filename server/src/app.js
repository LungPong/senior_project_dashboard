const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./configs/config')
const serveStatic = require('serve-static')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(serveStatic("../../client/dist"));

require('./routes')(app)

app.listen(config.port)