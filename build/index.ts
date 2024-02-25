import express,{ Express } from "express";
import {createServer } from "http";
import {Server,Socket} from "socket.io"
import cors from "cors"
const app = express();
const server = createServer(app);
const frontendURL = process.env.NODE_ENV === "production" ? "https://sketck-book.vercel.app" :"http://localhost:3000"
const io = new Server(server,
    {
        cors:{
            origin:frontendURL,
            credentials:true,
        },
        allowEIO3: true
    }
    );
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
io.on("connection",(socket:Socket)=>{
    console.log("server connected");
    
    socket.on("connect",()=>{
        console.log(socket.id);
    })
    socket.on("beginPath",({x,y})=>{
        socket.broadcast.emit("beginPath",{x,y});
    })
    socket.on("movePath",({x,y})=>{
        socket.broadcast.emit("movePath",{x,y});
    })
    socket.on("config",({color,size})=>{        
        socket.broadcast.emit("config",{color,size});
    })
})
server.listen(5001,()=>{
    console.log("Server is running on port 5001");
})