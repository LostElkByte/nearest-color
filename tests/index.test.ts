// nearestColor.test.ts
import NearestColor from '../src/index';
import { BASE_COLORS } from '../src/utils/defaultColors';

// Define the test suite to describe NearestColor class tests
describe('NearestColor', () => {
  // Find the nearest color - default color palette
  it('finds the nearest color - default color palette', () => {
    // Create an instance of the NearestColor class, initialized with the default color palette
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - default color palette');
    // Call the find method to find the nearest color, test color is #FF5733
    const result = nearestColorInstance.find('#FF5733');
    console.timeEnd('find nearest color - default color palette');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the nearest color is categorized as 'red' with a distance of approximately 23.32
    expect(result.category).toBe('red');
    expect(result.distance).toBeCloseTo(23.323807579381203, 0);
  });

  // Find the nearest color - custom color palette
  it('finds the nearest color - custom color palette', () => {
    // Create an instance of the NearestColor class, initialized with a custom color palette (BASE_COLORS)
    const nearestColorInstance = new NearestColor(BASE_COLORS);

    console.time('find nearest color - custom color palette');
    // Call the find method to find the nearest color, test color is #ffff00
    const result = nearestColorInstance.find('#ffff00');
    console.timeEnd('find nearest color - custom color palette');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the nearest color is categorized as 'yellow'
    expect(result.category).toBe('yellow');
  });

  // Find the nearest color - custom color palette using the from method
  it('finds the nearest color - from method', () => {
    // Create an instance of the NearestColor class using the from method and a custom color palette (BASE_COLORS)
    const nearestColorInstance = NearestColor.from(BASE_COLORS);

    console.time('find nearest color - from method');
    // Call the find method to find the nearest color, test color is #ffff00
    const result = nearestColorInstance.find('#ffff00');
    console.timeEnd('find nearest color - from method');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the nearest color is categorized as 'yellow'
    expect(result.category).toBe('yellow');
  });

  // Find the nearest color - concat method to add extra colors to the existing color palette
  it('finds the nearest color - concat method', () => {
    // Create an instance of the NearestColor class, initialized with the default color palette
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - concat method');
    const MY_COLORS = [
      {
        key: '#8A8360',
        name: ['褐', '褐色'],
      },
    ];

    // Add extra colors to the default or existing color palette
    const nearestColorInstanceNew = nearestColorInstance.concat(MY_COLORS);

    // Call the find method to find the nearest color, test color is #8A8360
    const result = nearestColorInstanceNew.find('#8A8360');
    console.timeEnd('find nearest color - concat method');

    console.log('Result:', result);

    // Use Jest assertions to ensure that the nearest color has the key '#8A8360'
    expect(result.key).toBe('#8A8360');
  });
});
