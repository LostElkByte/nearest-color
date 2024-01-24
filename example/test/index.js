
console.time('nearestColor - ES6 module');
import NearestColor from 'nearest-color';
try {
  const findNearestColor = new NearestColor();
  const result = findNearestColor.find('#fff');
  console.log(result);
} catch (error) {
  console.log(error);
}
console.timeEnd('nearestColor - ES6 module');


// console.time('nearestColor - CommonJS');
// const NearestColor = require('nearest-color');
// try {
//   const findNearestColor = new NearestColor();
//   const result = findNearestColor.find('#fff');
//   console.log(result);
// } catch (error) {
//   console.log(error);
// }
// console.timeEnd('nearestColor - CommonJS');
