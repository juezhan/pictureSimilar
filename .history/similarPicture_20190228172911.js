const fs = require('fs');
const path = require('path');
const basePath = './images/';
const imgFolder = path.resolve(__dirname, basePath);
const imgList = fs.readdirSync(imgFolder);

const imgFile = imgList.map(item=>{
  console.log('item',item);
  
  return fs.readFileSync(imgFolder+'/'+item)
})

console.log('imgFile',imgFile);


function similarPicture (img1, img2) {

}
