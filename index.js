const app = require('./app');

//socket.io implementation
const socket = require('socket.io');

//port number
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);

// socket.io implementation
// const origin = "https://www.technetic.co.in";
const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true,
    },
});

app.get('/', (req, res) => {
    res.send('Namste World !!!');
});

// users object
global.onlineUsers = new Map();

// connection event handler for socket.io
io.on('connection', (socket) => {
    global.chatSocket = socket;

    // add user with socket id to onlineUsers map
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    // send message event handler for socket.io
    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('message-recieve', data.message);
        }
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        onlineUsers.set(userToCall, socket.id);
        const getSocket = onlineUsers.get(userToCall);
        io.to(getSocket).emit('receviedCall', {
            signal: signalData,
            from,
            name,
        });
    });

    socket.on('answerCall', (data) => {
        const getSocket = onlineUsers.get(data.to);
        io.to(getSocket).emit('callAccepted', data.signal);
    });
});
