const dotenv = require('dotenv')
dotenv.config()

const path = require("path")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

//const cors = require("cors")
//app.use(cors())

app.use(express.static(path.join(__dirname, "/")))

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "..", 'index.html'))
})

app.get('/receive/', (request, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_RECEIVE)
})

app.get('/upload/', (request, response) => {
    response.send(process.env.AIRTABLE_API_TOKEN_UPLOAD)
})

app.get('/nameid/', (request, response) => {
    response.send(process.env.NAMEID)
}) 

app.get("/frontend.js", (req,res) =>{
    res.sendFile(path.join(__dirname, "frontend.js"))
})

app.use('/styles', express.static(path.join(__dirname, '..', 'styles')));

app.use("/img", express.static(path.join(__dirname, "..", "img")))


app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})
