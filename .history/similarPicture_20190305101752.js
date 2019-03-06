const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const imgFile = imgList.map( async (item)=>{
  console.log('item',item)
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  const oImg = loadImage(imgFolder+'/'+item);
  console.log('oImg',oImg);
  ctx.drawImage(oImg, 0, 0, 8, 8);
  return ctx.getImageData(0,0,8,8);
});



console.log('imgFile',imgFile);



function similarPicture (img1, img2) {

}
