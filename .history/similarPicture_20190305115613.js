const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');
const imgFile = imgList.map( async (item)=>{
  const oImg = await loadImage(imgFolder+'/'+item);
  console.log('oImg',oImg);
  ctx.drawImage(oImg, 0, 0, 8, 8);
  return ctx.getImgData(0,0,8,8)
});

console.log('imgFile',imgFile);

function similarPicture (img1, img2) {

}
