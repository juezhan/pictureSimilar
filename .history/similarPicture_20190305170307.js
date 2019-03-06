const fs = require('fs');
const path = require('path');
const { createImageData, loadImage, createCanvas } = require('canvas');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

async function imgDataList (imgList=[]) {
  const list = await Promise.all(imgList.map( async item => {
    const oImg = await loadImage(imgFolder+'/'+item);
    const imgWidth = 8;
    ctx.drawImage(oImg, 0, 0, imgWidth, imgWidth);
    const data = ctx.getImageData(0,0,imgWidth,imgWidth);
    return data.data;
  }));
  return list;
}

async function averageData (imgList) {
  const list = await imgDataList(imgList);  
  const averageList = list.map(item => {
    return item.map((newItem, index) => {
      if ((index+1)%4 === 0) {
        const newItem1 = newItem[index-3]
        const newItem2 = newItem[index-2]
        const newItem3 = newItem[index-1]
        const newItem4 = newItem[index]
        const average = (newItem1 + newItem2 + newItem3 + newItem4)/4;
        return average
      }
    });
  });
  console.log('averageList',averageList);
}


averageData(imgList);

function similarPicture (img1, img2) {

}
