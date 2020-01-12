let socket = io.connect('http://127.0.0.1:3001')

socket.on('image', (data) => {
    console.log("yo: " + JSON.stringify(data));

    var src = "data:image/png;base64,";
    src += data.decodedString;
    var newImage = document.createElement('img');
    newImage.src = src;
    newImage.width = newImage.height = "80";
    console.log("Here it is: " + newImage.outerHTML);
    document.querySelector('#previewImage').outerHTML = newImage.outerHTML;
    newImage = "";
    document.querySelector('#container').innerHTML += '<h1>Hello Dude!!</h1>';

})

socket.on('newPlayer', (id) => {
    console.log("ID: " + JSON.stringify(id))
})