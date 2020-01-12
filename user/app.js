const express = require('express');
const clientApp = express();
// const PORT = process.env.PORT || 8000
const PORT = 3001;
clientApp.use(express.static(__dirname + '/public'));
const cors = require('cors');
const socketio = require('socket.io');
const expressServer = clientApp.listen(PORT);
const clientIO = socketio(expressServer);
const helmet = require('helmet');
clientApp.use(helmet());
clientApp.options('*', cors())
clientApp.use(cors())
console.log(`Client app listening on port ${PORT}`);


module.exports = {
    clientIO,
    clientApp
}