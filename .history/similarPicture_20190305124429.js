const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');
const imgFile = imgList.map( async (item)=>{
  loadImage(imgFolder+'/'+item).then((img)=>{
    console.log('img',img)
  })
});

console.log('imgFile',imgFile);

function similarPicture (img1, img2) {

}
