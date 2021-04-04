const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./configs/config')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

require('./routes')(app)

app.listen(config.port)