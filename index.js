const app = require('./app');
//socket.io implementation
const socket = require('socket.io');

//port number
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log("Server is running!"))

const io = socket(server, {
    cors: {
        origin: "https://technetic.vercel.app",
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
