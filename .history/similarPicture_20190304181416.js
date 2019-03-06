const fs = require('fs');
const path = require('path');
const { createImageData, loadImage } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const imgFile = imgList.map(item=>{
  return fs.readFileSync(imgFolder+'/'+item)
})

const canvas = createCanvas(8, 8);
const ctx = canvas.getContext('2d');

const handledImgData = imgFile.map(async (item)=>{
  const img = new Image()
  img.src = item
  img.load = new Promise((res, rej)=>{
    ctx.drawImage(img, 0, 0)
    img.onload = res(ctx)
    img.onerror = rej(ctx)
  })
  return await img.onload()
})
console.log('handledImgData',handledImgData);



function similarPicture (img1, img2) {

}
