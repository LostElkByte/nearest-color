// nearestColor.test.ts
import NearestColor from '../src/index';
import { BASE_COLORS } from '../src/utils/defaultColors';

// Define the test suite to describe NearestColor class tests
describe('NearestColor', () => {
  // Find the nearest color - default color palette
  it('finds the nearest color - default color palette', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - default color palette');
    const result = nearestColorInstance.find('#FF5733');
    console.timeEnd('find nearest color - default color palette');

    expect(result.category).toBe('red');
    expect(result.distance).toBeCloseTo(23.323807579381203, 0);
  });

  // Find the nearest color - RGB input
  it('finds the nearest color - RGB input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - RGB input');
    const result = nearestColorInstance.find({ r: 255, g: 87, b: 51 });
    console.timeEnd('find nearest color - RGB input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - HSL input
  it('finds the nearest color - HSL input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - HSL input');
    const result = nearestColorInstance.find({ h: 14, s: 100, l: 58 });
    console.timeEnd('find nearest color - HSL input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - HSV input
  it('finds the nearest color - HSV input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - HSV input');
    const result = nearestColorInstance.find({ h: 14, s: 80, v: 100 });
    console.timeEnd('find nearest color - HSV input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - Hex input
  it('finds the nearest color - Hex input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - Hex input');
    const result = nearestColorInstance.find('#FF5733');
    console.timeEnd('find nearest color - Hex input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - RGB string input
  it('finds the nearest color - RGB string input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - RGB string input');
    const result = nearestColorInstance.find('rgb(255, 87, 51)');
    console.timeEnd('find nearest color - RGB string input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - HSL string input
  it('finds the nearest color - HSL string input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - HSL string input');
    const result = nearestColorInstance.find('hsl(14, 100%, 58%)');
    console.timeEnd('find nearest color - HSL string input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - HSV string input
  it('finds the nearest color - HSV string input', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - HSV string input');
    const result = nearestColorInstance.find('hsv(14, 80%, 100%)');
    console.timeEnd('find nearest color - HSV string input');

    expect(result.category).toBe('red');
  });

  // Find the nearest color - custom color palette
  it('finds the nearest color - custom color palette', () => {
    const nearestColorInstance = new NearestColor(BASE_COLORS);

    console.time('find nearest color - custom color palette');
    const result = nearestColorInstance.find('#ffff00');
    console.timeEnd('find nearest color - custom color palette');

    expect(result.category).toBe('yellow');
  });

  // Find the nearest color - custom color palette using the from method
  it('finds the nearest color - from method', () => {
    const nearestColorInstance = NearestColor.from(BASE_COLORS);

    console.time('find nearest color - from method');
    const result = nearestColorInstance.find('#ffff00');
    console.timeEnd('find nearest color - from method');

    expect(result.category).toBe('yellow');
  });

  // Find the nearest color - concat method to add extra colors to the existing color palette
  it('finds the nearest color - concat method', () => {
    const nearestColorInstance = new NearestColor();

    console.time('find nearest color - concat method');
    const MY_COLORS = [
      {
        key: '#8A8360',
        name: ['褐', '褐色'],
      },
    ];
    const nearestColorInstanceNew = nearestColorInstance.concat(MY_COLORS);
    const result = nearestColorInstanceNew.find('#8A8360');
    console.timeEnd('find nearest color - concat method');

    expect(result.key).toBe('#8A8360');
  });

  // Find the nearest color - throws an error for invalid color input
  it('finds the nearest color - throws an error for invalid color input', () => {
    const nearestColorInstance = new NearestColor();
    expect(() => nearestColorInstance.find('invalidColor')).toThrow(
      'Invalid color: invalidColor',
    );
  });

  // Find the nearest color - throws an error on the empty array color palette
  it('finds the nearest color - throws an error on the empty array color palette', () => {
    try {
      const nearestColorInstance = new NearestColor([]);
      expect(() => nearestColorInstance.find('#FF5733')).toThrow(
        'Color palette must be a non-empty array',
      );
    } catch (error) {}
  });

  // Find the nearest color - throws an error on the empty array color palette to from method
  it('finds the nearest color - throws an error on the empty array color palette to from method', () => {
    try {
      const nearestColorInstance = new NearestColor([]);
      expect(() => nearestColorInstance.find('#FF5733')).toThrow(
        'Color palette must be a non-empty array',
      );
    } catch (error) {}
  });
});
