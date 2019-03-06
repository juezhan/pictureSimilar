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

async function toGray (imgList) {
  const list = await imgDataList(imgList);
  const averageList = [];
  list.forEach(item => {
    const itemList = [];
    item.forEach((newItem, index) => {
      if ((index+1)%4 === 0) {
        const newItem1 = item[index-3];
        const newItem2 = item[index-2];
        const newItem3 = item[index-1];
        const gray = (newItem1 + newItem2 + newItem3)/3;
        itemList.push(~~gray);  
      }
    });
    const hashData = getHash(itemList);
    averageList.push(hashData);
  });
  console.log('averageList',averageList);
  
  return averageList;
}

function getHash (arr) {
  const length = arr.length;
  const average = arr.reduce((pre, next) => pre+next, 0)/length;
  return arr.map(item => item >= average ? 1 : 0).join('');
}

function strSimilarity2Number(s, t){
	var n = s.length, m = t.length, d=[];
	var i, j, s_i, t_j, cost;
	if (n == 0) return m;
	if (m == 0) return n;
	for (i = 0; i <= n; i++) {
		d[i]=[];
		d[i][0] = i;
	}
	for(j = 0; j <= m; j++) {
		d[0][j] = j;
	}
	for (i = 1; i <= n; i++) {
		s_i = s.charAt (i - 1);
		for (j = 1; j <= m; j++) {
			t_j = t.charAt (j - 1);
			if (s_i == t_j) {
				cost = 0;
			}else{
				cost = 1;
			}
		d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
		}
	}
	return d[n][m];
}
function Minimum(a,b,c){
	return a<b?(a<c?a:c):(b<c?b:c);
}
//两个字符串的相似程度，并返回相似度百分比
function strSimilarity2Percent(s, t){
  console.log(s,t);
	var l = s.length > t.length ? s.length : t.length;
	var d = strSimilarity2Number(s, t);
	return (1-d/l).toFixed(4);
}

async function similarPicture () {
  const arr = [];
  console.log('arr',arr);
  
  const array = [];
  // for (let index = 0; index < arr.length; index++) {
  //   const element = arr[index];
  //   for (let i = index+1; i < arr.length; i++) {
  //     const element1 = arr[i];
  //     const percent = strSimilarity2Percent(element, element1);
  //     console.log('percent',percent);
    
  //     if (percent>0.9) {
  //       console.log(index, i);
  //       array.push([index, i]);
  //     }
  //   }
  // }
  const percent13 = strSimilarity2Percent(arr[1], arr[3]);
  const percent14 = strSimilarity2Percent(arr[1], arr[4]);
  const percent34 = strSimilarity2Percent(arr[3], arr[4]);
  console.log('percent13',percent13);
  console.log('percent14',percent14);
  console.log('percent34',percent34);
  return array;
}

similarPicture();