const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas, Canvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const imgFile = imgList.map(item=>{
  return fs.readFileSync(imgFolder+'/'+item)
});

const handledImgData = imgFile.map((item)=>{
  const canvas = createCanvas(8, 8);
  const ctx = canvas.getContext('2d');
  const img = new Canvas.Image();
  img.src = item;
  ctx.drawImage(img, 0, 0, 8, 8);
  ctx.getImageData(0, 0, 8, 8);
  return ctx;
});

console.log('handledImgData',handledImgData);



function similarPicture (img1, img2) {

}
