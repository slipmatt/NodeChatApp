var express = require('express')
var app = express()

// Routes
app.use(express.static(__dirname))

var messages=[
   {name: "Imtiaz",message: "Hello"},
   {name: "AI Machine",message: "Hi"},
]
app.get('/messages', (req,res) => {
    res.send(messages)
})

//listener
var server = app.listen(3000,() => {
    console.log('server is listening on port', server.address().port)
})