const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
app.use(express.static(__dirname + '/public'));
const cors = require('cors');
const socketio = require('socket.io');
const expressServer = app.listen(PORT);
const io = socketio(expressServer);
const helmet = require('helmet');
app.use(helmet());

app.options('*', cors())
app.use(cors())
console.log(`Express and socketio are listening on port ${PORT}`);


module.exports = {
    app,
    io
}