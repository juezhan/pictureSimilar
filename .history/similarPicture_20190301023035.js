const fs = require('fs');
const path = require('path');
const { createImageData } = require('canvas')
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const imgFile = imgList.map(item=>{
  return fs.readFileSync(imgFolder+'/'+item)
})
const imgFileData = imgFile.map(item=>{
  return createImageData(item, 8, 8)
})

console.log('imgFileData',imgFileData);


function similarPicture (img1, img2) {

}
