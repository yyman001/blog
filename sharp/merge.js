
const sharp = require('sharp')
const path = require('path')
async function mergeImages(stringArray, outFilePath) {

    if (!Array.isArray(stringArray)) {
        throw console.error('请传入字符串图片路径数组')
        return
    }
    // 拷贝数组
    let mergeArray = stringArray.slice()

    // 获取第一张
    let backgroudImages = mergeArray.shift()

    // 第一张要转换为buffer数据
    let backgroudBuffer =  getBuffer(backgroudImages)
    // 获取合并数据
    let mergeImagesBuffer = await mergeImagesForArray(mergeArray, backgroudBuffer)
    console.log('mergeImagesBuffer:',mergeImagesBuffer)
    // mergeImagesBuffer.then((data) => {
    //    sharp(data.data).toFile(outFilePath);
    //  }).catch(error => {
    //    throw new Error('Generate Share Image Failed.');
    //  });
    if(mergeImagesBuffer && mergeImagesBuffer.data){
        outMergeImages(mergeImagesBuffer.data, outFilePath)
    }else{
        throw console.error('合成数据出错!')
    }
}

function outMergeImages (mergeImagesBuffer, outFilePath) {
    sharp(mergeImagesBuffer).toFile(outFilePath, function(err, info){})
}

function getBuffer(stringImagePath) {
    if (typeof stringImagePath !== 'string') {
        return new Promise().reject({})
    }
    return sharp(stringImagePath).toBuffer({
        resolveWithObject: true
    })
}

// 合并数组里面的全部图片
function mergeImagesForArray(stringArray, backgroudBuffer) {
    return stringArray.reduce((input, next_overlay, index) => {

        return input.then(input_result => {
          return sharp(input_result.data)
          /*
          sharp.gravity: { 
          centre: 0, // 默认
          north: 1,
          east: 2,
          south: 3,
          west: 4,
          northeast: 5,
          southeast: 6,
          southwest: 7,
          northwest: 8 }
          */
            // options.gravity(centre) 默认居中 { gravity: sharp.gravity.southeast }
            .overlayWith(next_overlay /* { gravity: sharp.gravity.southeast } */) // 全尺寸图片不支持top/left
            .toBuffer({ resolveWithObject: true });
        })
  
      }, backgroudBuffer)
}


module.exports = {
    mergeImages,
    outMergeImages
}