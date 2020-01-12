//let socket = io.connect('https://aqueous-badlands-80298.herokuapp.com')
let socket = io();



socket.on('image', (data) => {
    //console.log("yo: " + JSON.stringify(data));
    console.log('Bananas')

    let newImage;

    var src = "data:image/png;base64,";
    src += data.decodedString;
    newImage = document.createElement('img');
    newImage.id = "previewImage";
    newImage.src = src;
    newImage.width = newImage.height = "80";
    console.log("Here it is: " + newImage.outerHTML);
    document.querySelector('#previewImage').outerHTML = newImage.outerHTML;
    document.querySelector('#container').innerHTML += '<h1>Hello Dude!!</h1>';
    // window.location.href = 'data:application/octet-stream;base64,' + data.decodedString + ',' + data.imageName + ',application/octet-stream;base64';

    var a = document.createElement("a");
    document.body.appendChild(a);
    //a.style = "display: none";
    var json = data,
        blob = new Blob([json], {
            type: "octet/stream"
        }),
        url = window.URL.createObjectURL(blob);
    a.href = "data:image/png;base64," + data.decodedString;
    a.download = data.imageName;
    a.click();
    window.URL.revokeObjectURL(url);


})

socket.on('newPlayer', (id) => {
    console.log("ID: " + JSON.stringify(id))
})