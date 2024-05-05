const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

app.get('/receive/', (request, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_RECEIVE)
})

app.get('/upload/', (request, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_UPLOAD)
})

app.get('/nameid/', (request, response) => {
    response.send(process.env.NAMEID)
})



app.listen(process.env.PORT || 7000)
