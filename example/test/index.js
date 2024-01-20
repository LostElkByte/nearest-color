import ClosestColor from '../node_modules/closest-color/dist/index.esm.js';

console.time('closestColor');
const findClosestColor = new ClosestColor();
const result = findClosestColor.find('#0ff');
console.log(result);
console.timeEnd('closestColor');
