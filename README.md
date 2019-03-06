# 图片相似度判断
看了阮老师的[相似图片搜索的原理](http://www.ruanyifeng.com/blog/2011/07/principle_of_similar_image_search.html)有感，便用node js实现了一版，记录下canvas图形操作的一些常用api  

>第一步，缩小尺寸  
>将图片缩小到8x8的尺寸，总共64个像素。这一步的作用是去除图片的细节，只保留结构、明暗等基本信息，摒弃不同尺寸、比例带来的图片差异。
```
async function shrinkingImg (imgList=[]) {
  const list = await Promise.all(imgList.map( async item => {
    const oImg = await loadImage(imgFolder+'/'+item);
    const imgWidth = 8;
    ctx.clearRect(0, 0, imgWidth, imgWidth);
    ctx.drawImage(oImg, 0, 0, imgWidth, imgWidth);
    const data = ctx.getImageData(0,0,imgWidth,imgWidth);
    return data.data;
  }));
  return list;
}
```
因为map是同步进行的加载图片是异步行为，在不使用 Promise.all 时会返回一个promise数组 如下；
```
[ Promise { <pending> },Promise { <pending> } ]
```

---

>第二步，简化色彩  
>将缩小后的图片，转为64级灰度。也就是说，所有像素点总共只有64种颜色  

>第三步，计算平均值。  
>计算所有64个像素的灰度平均值。

>第四步，比较像素的灰度。  
>将每个像素的灰度，与平均值进行比较。大于或等于平均值，记为1；小于平均值，记为0。

>第五步，计算哈希值。  
>将上一步的比较结果，组合在一起，就构成了一个64位的整数，这就是这张图片的指纹。组合的次序并不重要，只要保证所有图片都采用同样次序就行了。
```
async function getHashList (imgList) {
  const list = await shrinkingImg(imgList);
  const averageList = [];
  list.forEach(item => {
    const itemList = [];
    item.forEach((newItem, index) => {
      if ((index+1)%4 === 0) {
        const newItem1 = item[index-3];
        const newItem2 = item[index-2];
        const newItem3 = item[index-1];
        // 转为64级灰度
        const gray = (newItem1 + newItem2 + newItem3)/3;
        itemList.push(~~gray);
      }
    }); 
    const hashData = getHash(itemList);
    averageList.push(hashData);
  });
  return averageList;
}

function getHash (arr) {
  const length = arr.length;
  // 计算灰度平均值
  const average = arr.reduce((pre, next) => pre+next, 0)/length;
  // 计算hash 值
  return arr.map(item => item >= average ? 1 : 0).join('');
}
```
通过上面的方法会返回一个包含64位长度字符串的二维数组
```
[[101112...,11112...],[...]]
```
第六步，用[编辑距离算法](https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm)遍历二维数组返回相似度达到条件的图片名二维数组
```
async function getSimilarImgList (imgList=[], limit=0.85) {  
  //异常处理
  if (!imgList.length) return [];
  // 获取图片索引二维数组
  const arr = await getHashList(imgList);
  const array = [];
  // 已经匹配的图片无需再做遍历
  const includeList = [];
  for (let index = 0,length = arr.length; index < length; index++) {
    const element = arr[index];
    const list = [];
    for (let i = index+1; i < length; i++) {
      const elementNext = arr[i];
      // 获取图片相似度
      const percent = strSimilarity2Percent(element, elementNext);
      const includeItem = includeList.indexOf(i) > 0;
      if (percent>limit && !includeItem) {
        list.push(i);
        includeList.push(i);
      }
    }
    if (list.length) array.push([index,...list]);
  }
  // 按图片索引值找到对应图片名
  const mappingArr = array.map(item=>{
    return item.map(index => imgList[index]);
  });
  return mappingArr;
}
```

脚本执行 node similarPicture.js [imgFolderPath]  
imgFolderPath为要处理的包含图片文件夹  
imgFolderPath的默认值为此脚本目录下的images

项目源码地址: [https://github.com/tomatoKnightJ/pictureSimilar](https://github.com/tomatoKnightJ/pictureSimilar)

[md语法介绍](http://xianbai.me/learn-md/article/extension/strikethrougn.html)

