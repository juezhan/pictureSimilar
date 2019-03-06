const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

const imgDataList = function async (imgFile) {
  return imgList.map( async (item)=>{
    const oImg = await loadImage(imgFolder+'/'+item);
    console.log('oImg',oImg);
    ctx.drawImage(oImg, 0, 0, 8, 8);
    const data = ctx.getImageData(0,0,8,8);
    console.log('data',data);
    
    return data.data
  });
}


console.log('imgDataList',imgDataList());

function similarPicture (img1, img2) {

}
