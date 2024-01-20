// closestColor.test.ts
import ClosestColor from '../src/index';
import { BASE_COLORS } from '../src/utils/defaultColors';

// Define the test suite to describe ClosestColor class tests
describe('ClosestColor', () => {
  // Find the closest color - default color palette
  it('finds the closest color - default color palette', () => {
    // Create an instance of the ClosestColor class, initialized with the default color palette
    const closestColorInstance = new ClosestColor();

    console.time('find closest color - default color palette');
    // Call the find method to find the closest color, test color is #FF5733
    const result = closestColorInstance.find('#FF5733');
    console.timeEnd('find closest color - default color palette');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the closest color is categorized as 'red' with a distance of approximately 23.32
    expect(result.category).toBe('red');
    expect(result.distance).toBeCloseTo(23.323807579381203, 0);
  });

  // Find the closest color - custom color palette
  it('finds the closest color - custom color palette', () => {
    // Create an instance of the ClosestColor class, initialized with a custom color palette (BASE_COLORS)
    const closestColorInstance = new ClosestColor(BASE_COLORS);

    console.time('find closest color - custom color palette');
    // Call the find method to find the closest color, test color is #ffff00
    const result = closestColorInstance.find('#ffff00');
    console.timeEnd('find closest color - custom color palette');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the closest color is categorized as 'yellow'
    expect(result.category).toBe('yellow');
  });

  // Find the closest color - custom color palette using the from method
  it('finds the closest color - from method', () => {
    // Create an instance of the ClosestColor class using the from method and a custom color palette (BASE_COLORS)
    const closestColorInstance = ClosestColor.from(BASE_COLORS);

    console.time('find closest color - from method');
    // Call the find method to find the closest color, test color is #ffff00
    const result = closestColorInstance.find('#ffff00');
    console.timeEnd('find closest color - from method');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the closest color is categorized as 'yellow'
    expect(result.category).toBe('yellow');
  });

  // Find the closest color - concat method to add extra colors to the existing color palette
  it('finds the closest color - concat method', () => {
    // Create an instance of the ClosestColor class, initialized with the default color palette
    const closestColorInstance = new ClosestColor();

    console.time('find closest color - concat method');
    const MY_COLORS = [
      {
        key: '#8A8360',
        name: ['褐', '褐色'],
      },
    ];

    // Add extra colors to the default or existing color palette
    const closestColorInstanceNew = closestColorInstance.concat(MY_COLORS);

    // Call the find method to find the closest color, test color is #8A8360
    const result = closestColorInstanceNew.find('#8A8360');
    console.timeEnd('find closest color - concat method');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the closest color has the key '#8A8360'
    expect(result.key).toBe('#8A8360');
  });
});
