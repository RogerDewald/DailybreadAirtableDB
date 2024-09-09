const dotenv = require('dotenv')
dotenv.config()
const fs = require("node:fs")

const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

app.get("/", (_, res) => {
    fs.readFile("../index.html", "utf8", (err, html) => {
        if (err){
            res.status(500).send("sorry, out of order")
        }
        res.send(html)
    })
})

app.get('/receive/', (_, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_RECEIVE)
})

app.get('/upload/', (_, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_UPLOAD)
})

app.get('/nameid/', (_, response) => {
    response.send(process.env.NAMEID)
})



app.listen(process.env.PORT || 7000)
