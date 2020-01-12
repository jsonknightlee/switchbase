class Image {
    constructor(socketId, imageData, imageName, imageType) {
        this.socketId = socketId;
        this.imageData = imageData;
        this.imageName = imageName;
        this.imageType = imageType;
    }


}

module.exports = Image;