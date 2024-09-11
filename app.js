const express = require("express");
const app = express();
const path = require("path");

const http = require("http");  //socketio runs on http server

const socketio = require("socket.io");
const server = http.createServer(app); //ye server banayega line 3 s
const io = socketio(server); //line 3-9 socketio ka boilerplate h.

app.set("view engine", "ejs");  //ejs setup kar rhe h
app.use(express.static(path.join(__dirname, "public")));   //public folder setup kr rhe(basically ye images javascript css file sab k liye hota h)

io.on("connection",function(socket){
    socket.on("send-location", function (data){
        io.emit("receive-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    })
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000); 
