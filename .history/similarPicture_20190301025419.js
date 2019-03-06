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
  const data = new Uint16Array(item)
  return createImageData(data, 4, 4)
})

console.log('imgFileData',imgFileData[0].data.length);


function similarPicture (img1, img2) {

}
