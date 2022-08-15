const  express = require('express') // Importing express
const app = express() // Calling express
const http = require('http').createServer(app)  // Creating http server


const PORT = process.env.PORT  || 3000 // Assigning port & giving default port as 3000

// Server is listening to the given port
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Using express middleware for 
// Creating a route telling the server about the other url
app.use(express.static(__dirname + '/Public')) 


// '/' - It means the default homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html') // If this url is requested, then in response we are sending the index.html file
}) 


// Socket
const io = require('socket.io')(http) // Socket.io gets to know on which server it has to work on.

io.on('connection', (socket) => { //Server connection is established
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)  // Sending the message to all the users who are connected to socket except to the user who is sendin the message    
    })

})