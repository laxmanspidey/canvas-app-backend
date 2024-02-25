"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const frontendURL = app.get('env') === 'development' ? 'http://localhost:3000' : 'https://sketck-book.vercel.app/';
const io = new socket_io_1.Server(server, {
    cors: {
        origin: frontendURL,
        credentials: true,
    },
    allowEIO3: true
});
app.use((0, cors_1.default)({
    origin: frontendURL
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
io.on("connection", (socket) => {
    console.log("server connected");
    socket.on("connect", () => {
        console.log(socket.id);
    });
    socket.on("beginPath", ({ x, y }) => {
        socket.broadcast.emit("beginPath", { x, y });
    });
    socket.on("movePath", ({ x, y }) => {
        socket.broadcast.emit("movePath", { x, y });
    });
    socket.on("config", ({ color, size }) => {
        socket.broadcast.emit("config", { color, size });
    });
});
server.listen(5001, () => {
    console.log("Server is running on port 5001");
});
