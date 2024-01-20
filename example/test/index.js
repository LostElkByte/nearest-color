import NearestColor from '../node_modules/nearest-color/dist/index.esm.js';

console.time('nearestColor');
const findNearestColor = new NearestColor();
const result = findNearestColor.find('#0ff');
console.log(result);
console.timeEnd('nearestColor');
