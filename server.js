var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
// Routes
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var messages=[]

app.get('/messages', (req,res) => {
    res.send(messages)
})

app.post('/messages', (req,res) => {
    messages.push(req.body)
    io.emit('message',req.body)
    res.sendStatus(200)
})

io.on('connection',(socket_ => {
    console.log('a user connected')
}))

//listener
var server = http.listen(3000,() => {
    console.log('server is listening on port', server.address().port)
})