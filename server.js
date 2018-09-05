var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
// Routes
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var dbUrl = 'mongodb://slipmattOSUser1:slipmattOSUser1@ds243212.mlab.com:43212/chatappslipmatt'

var Message = mongoose.model('Message',{
    name: String, 
    message: String
})


app.get('/messages/:user', (req,res) => {
    var user = req.params.user
    Message.find({name: user}, (err, messages) => {
        console.log(err)
        console.log(messages)
        res.send(messages)
    })
})

app.get('/messages', (req,res) => {
    Message.find({}, (err, messages) => {
        console.log(err)
        console.log(messages)
        res.send(messages)
    })
})

app.post('/messages', (req,res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if (err) sendStatus(500)
        io.emit('message',req.body)
        res.sendStatus(200)
    })
})


io.on('connection',(socket_ => {
    console.log('a user connected')
}))

//mongoose
mongoose.connect(dbUrl, (err) => {
    console.log('mongodb Connection',err)
})


//listener
var server = http.listen(3000,() => {
    console.log('server is listening on port', server.address().port)
})