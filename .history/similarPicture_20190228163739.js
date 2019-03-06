const fs = require('fs');
const path = require('path');
const imgFolder = path.resolve(__dirname, './images/');
console.log('imgFolder',imgFolder);

const imgList = fs.readFileSync(imgFolder);
console.log('imgList',imgList);


function similarPicture (img1, img2) {

}
