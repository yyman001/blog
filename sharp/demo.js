const f  = require('./merge')
const ptah = require('path')
function mergePath (stringPathOrStringPathArray) {
    return ptah.join(__dirname, stringPathOrStringPathArray)
}
const outFilePath = mergePath('merge.png')
console.log('outFilePath:',outFilePath)

f.mergeImages([
    'n1.png',
    'n2.png',
    'n3.png',
    'n4.png',
    'n5.png',
    'n6.png',
    'n7.png',
    'n8.png',
    'n9.png',
    'n10.png',
    'n11.png',
    'n12.png'
],outFilePath)
