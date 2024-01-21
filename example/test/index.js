import NearestColor from '@lostelk/nearest-color';
// const NearestColor = require('@lostelk/nearest-color');

console.time('nearestColor');
const findNearestColor = new NearestColor();
const result = findNearestColor.find('#fff');
console.log(result);

console.timeEnd('nearestColor');
