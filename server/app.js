import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;
const app = express();
const server = createServer(app);

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true
}))

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
        credentials: true
    }
});


app.get('/', (req, res) => res.json({ message: 'Welcome to the application' }));

io.on('connection', (socket) => {
    console.log('User connected to socket');
    console.log('Id : ', socket.id);

    socket.emit('welcome', `Welcome to the server ${socket.id}`)
    socket.broadcast.emit('new joiner', `${socket.id} join the server.`)
    
    socket.on('disconnect', ()=>{
        console.log(socket.id, 'disconnected');
    })
});



server.listen(port, () => {
    console.log(`Server is running http://127.0.0.1:${port}`);
});