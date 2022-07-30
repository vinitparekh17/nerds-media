const app = require('./app');

//socket.io implementation
const socket = require('socket.io');
const cors = require('cors');

//port number
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log("Server is running!"))

// cors middleware which allows to read external websites
// cors stands for Cross Origin Resource Locator
const origin = 'https://technetic.vercel.app';
app.use(
    cors({
        origin: origin,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept, Origin, Referer, User-Agent, Cache-Control, Pragma, Expires",
        allowedOrigins: "*"
    })
);

// socket.io implementation
const io = socket(server, {
    cors: { origin, credentials: true }
})

// users object
global.onlineUsers = new Map();

// connection event handler for socket.io
io.on("connection", socket => {
    global.chatSocket = socket;

    // add user with socket id to onlineUsers map
    socket.on("add-user", userId => {
        onlineUsers.set(userId, socket.id)
    })

    // send message event handler for socket.io
    socket.on("send-message", data => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("message-recieve", data.message)
        }
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        onlineUsers.set(userToCall, socket.id)
        const getSocket = onlineUsers.get(userToCall)
        io.to(getSocket).emit("receviedCall", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        const getSocket = onlineUsers.get(data.to)
        io.to(getSocket).emit("callAccepted", data.signal)
    });

})
