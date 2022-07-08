const app = require('./app');
//socket.io implementation
const socket = require('socket.io');

//port number
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log("Server is running!"))

const io = socket(server, {
    cors: {
<<<<<<< HEAD
        origin: "http://localhost:3000",
=======
        origin: "https://technetic.vercel.app",
>>>>>>> ab3c8b9ccf91b986f74bc55933fbb75309f68368
        credentials: true,
    },
})

global.onlineUsers = new Map()

io.on("connection", socket => {
    global.chatSocket = socket;


    socket.on("add-user", userId => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-message", data => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("message-recieve", data.message)
        }
    })
})
