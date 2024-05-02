const dotenv = require('dotenv')
dotenv.config({ path: "../.env" })
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

app.get('/', (request, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_RECEIVE)
})

app.listen(process.env.PORT || 7000)
