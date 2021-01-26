// importing files
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const { request } = require('http')
const { response } = require('express')
const app = express()
const port = 3030

// output formatting
app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// request methods formatting
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postgres API' })
})

app.get('/cars', db.getCars)
app.get('/car/:id', db.getCarById)

// running port and application
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})