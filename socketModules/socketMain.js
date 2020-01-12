const io = require('../server').io;
const fs = require('fs');
const io2 = require('../user/app').clientIO;
// const getUserIP = require('./getUserIP');
const Image = require('../classes/Image');
// const decodedString = require('./')

let image;
let image2 = new Image();


io.sockets.on('connection', (socket, util, image2) => {
    console.log("Player Connected!" + socket.id);

    //  getUserIP();


    let decodedString;
    let imageName;

    let imageLocation;

    let id = socket.id;


    let text;

    if (socket.id != null) {
        socket.emit('connected', {
            text: "You are connected yeah!",
            id: socket.id
        })
    };




    socket.on('message', (data) => {
        console.log("Message Received!");
        //Buffer.from(data.image.split('.')[1], 'base64').toString()
        // Decode the String



        console.log(data.fileName + " " + data.fileType);

        if (data.image) {
            image = new Image(socket.id, data.image, data.imageName, data.imageType);
            image2 = Object.assign(Object.create(Object.getPrototypeOf(image)), image)

            console.log("TESTTTTTTTT: " + image2.imageName);

            decodedString = data.image;

            dirpath = 'C:\\Users\\test01\\Desktop\\SwitchBase';

            imageName = data.imageName;
            imageLocation = dirpath + "\\" + imageName;

            fs.writeFile(imageLocation, decodedString, 'base64', function (err) {});

            if (typeof image != 'undefined') {
                console.log(image.fileType);
            }

        } else if (data.file) {
            decodedString = data.file;

            // We get file type from the name but if you set it to auto open we might need 
            // to do different things for different file types 
            // also good to have more info here but we'll see if it affects speed
            //if(data.fileType == "xlxs" || data.fileTyp == 'xls')


            dirpath = 'C:\\Users\\test01\\Desktop\\SwitchBase';
            imageName = data.fileName;
            fileLocation = dirpath + "\\" + imageName;
            fs.writeFile(fileLocation, decodedString, 'base64', function (err) {
                if (err !== null) {
                    console.log(err);
                }

            });


        } else if (data.audio) {
            decodedString = data.audio;

            console.log(data)

            dirpath = 'C:\\Users\\test01\\Desktop\\SwitchBase';
            imageName = data.fileName;
            audioLocation = dirpath + "\\" + imageName;

            fs.writeFile(audioLocation, decodedString, 'base64', function (err) {
                if (err !== null) {
                    console.log(err);
                }

            });

            fs.writeFileSync(audioLocation, Buffer.from(decodedString.replace('data:audio/ogg; codecs=opus;base64,', ''), 'base64'));
        } else if (data.video) {
            decodedString = data.video;

            console.log(data);

            dirpath = 'C:\\Users\\test01\\Desktop\\SwitchBase';
            imageName = data.fileName;
            videoLocation = dirpath + "\\" + imageName;

            fs.writeFile(videoLocation, decodedString, 'base64', function (err) {
                if (err !== null) {
                    console.log(err);
                }

            });

            fs.writeFileSync(videoLocation, Buffer.from(decodedString.replace('data:video/*; base64,', ''), 'base64'));
        }

        //  console.log(decodedString);

        // console.log("TESTTTTTTTT222222222222: " + image2.imageName);

        io.sockets.emit('image', {
            decodedString,
            imageName
        })

        socket.emit('newPlayer', {
            id: socket.id
        });



    })

    //while(decode)


    socket.on('disconnect', function () {
        console.log("Player disconnected!");
    });
});



//console.log("TESTTTTTTTT000000000000: " + image2.imageName);
/*
while (image2) {
    if (typeof image2 != 'undefined') {

        io2.sockets.on('connection', (socket) => {
            console.log('Client connected!')
            console.log("yo yo yo + " + image2.fileName)
        })
    }
    break;
}

*/


decodeBase64 = function (f) {
    var g = {},
        b = 65,
        d = 0,
        a, c = 0,
        h, e = "",
        k = String.fromCharCode,
        l = f.length;
    for (a = ""; 91 > b;) a += k(b++);
    a += a.toLowerCase() + "0123456789+/";
    for (b = 0; 64 > b; b++) g[a.charAt(b)] = b;
    for (a = 0; a < l; a++)
        for (b = g[f.charAt(a)], d = (d << 6) + b, c += 6; 8 <= c;)((h = d >>> (c -= 8) & 255) || a < l - 2) && (e += k(h));
    return e
};

module.exports = io;