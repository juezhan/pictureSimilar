const fs = require('fs');
const path = require('path');
const imgFolder = path.resolve(__dirname, './images/');
const imgList = fs.readdirSync(imgFolder);

console.log('imgList',imgList);


function similarPicture (img1, img2) {

}
