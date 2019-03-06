const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const imgFile = imgList.map( async item=>{
const { createImageData, loadImage, createCanvas } = require('canvas');
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  const oImg = await loadImage(imgFolder+'/'+item);
  ctx.drawImage(oImg, 0, 0, 8, 8)

});



console.log('handledImgData',handledImgData);



function similarPicture (img1, img2) {

}
