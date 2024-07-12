const express = require("express");

const app = express();

const http = require("http");

const socketIo = require("socket.io");

const path = require("path");

const server= http.createServer(app)

const io = socketIo(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
// app.set(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
  console.log("New client connected");

  socket.on("send-location", function(data){
    io.emit('receive-location', {
            id: socket.id,
            latitude: data.latitude,
            longitude: data.longitude
        });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected',socket?.id);
    io.emit('remove-marker', socket?.id);
    });
});

const port = 1000; 


app.get("/", (req, res) => {
    // res.send("welcome to my project device track");
    res.render("index");
  });
  console.log("welcome to my project device track");


  server.listen(port, () => {
    console.log("listening on port" + " " + port);
  });
  