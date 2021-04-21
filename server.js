const App = require("express")();
const server = require("http").createServer(App)
const cors = require("cors")
const io = require("socket.io")(server,{
    cors: {
        origin: "*",
        methods: ['GET' , 'POST'],
    }
})


App.use(cors())

const PORT = process.env.PORT || 3001;

App.get("/", (req,res) => {
    res.send(`Server Running on ${PORT} ... ...`)
})


io.on('connection', (socket) => {
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.emit('callended')
    })

    socket.on('calluser', ({ userToCall, signalData, from, name })=>{
        io.to(userToCall).emit("calluser", {signal: signalData, from, name})
    })

    socket.on('answercall', (data) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})


server.listen(PORT, () => console.log(`Server Running on ${PORT} ... ...`))