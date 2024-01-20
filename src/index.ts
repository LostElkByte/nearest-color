import tinycolor from 'tinycolor2';
import { DEFAULT_COLORS } from './utils/defaultColors';

// Interface for a color entry
// 用于颜色条目的接口
interface ColorEntry {
  key: string;
  [key: string | number | symbol]: any;
}

// Interface for RGB color representation
// 用于RGB颜色的接口
interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// Interface for the result of finding the nearest color
// 用于查找最接近的颜色返回结果的接口
interface NearestColorResult {
  key: string;
  [key: string | number | symbol]: any;
  distance: number;
}

// Class definition for finding the nearest color
// 查找最接近的颜色的类
class NearestColor {
  // Array to store the color palette
  // 使用数组来存储调色板
  colorPalette: ColorEntry[];

  constructor(colorPalette: ColorEntry[] = DEFAULT_COLORS) {
    this.colorPalette = colorPalette;
  }

  // Color palette cache
  // 调色板缓存
  private colorPaletteMap: Map<string | RGB, RGB> = new Map();

  private getColorPaletteMap(color: string | RGB): RGB {
    // Check if there is a cache
    // 检查是否有缓存
    if (this.colorPaletteMap.has(color)) {
      return this.colorPaletteMap.get(color)!;
    }

    // If there is no cache, perform color conversion and cache the result
    // 如果没有缓存，则进行颜色转换并缓存结果
    const rgb = tinycolor(color).toRgb();
    this.colorPaletteMap.set(color, rgb);
    return rgb;
  }

  /**
   * Find the nearest color
   * 寻找最接近的颜色
   * @param {string | RGB} color - Color to match (supports hex, rgb strings, or RGB objects) 要匹配的颜色（支持 hex、rgb 字符串或 RGB 对象）
   * @returns {NearestColorResult} - The object nearest to the color, containing color key-value pairs and distance information, as well as any other properties 最接近颜色的对象，包含颜色键值对和距离信息以及任意其它的属性
   */
  find(color: string | RGB): NearestColorResult {
    // If the color is not valid, throw an error
    // 如果颜色不符合规则，抛出错误
    if (!tinycolor(color).isValid()) {
      throw new Error(`Invalid color: ${color}`);
    }

    // Convert the color to RGB object
    // 将颜色其转换为 RGB 对象
    const targetRGB = tinycolor(color).toRgb();

    // Initialize the minimum squared distance to infinity
    // 初始化最小距离平方为无穷大
    let minDistanceSq = Infinity;

    // Variable to store the nearest color object
    // 存储最接近颜色对象的变量
    let nearestColor;

    // Iterate through the color palette
    // 遍历颜色调色板
    for (const colorEntry of this.colorPalette) {
      // Get the color key
      // 获取颜色键值
      const colorKey = colorEntry.key;
      // If the color key is invalid, log a warning and skip
      // 如果颜色键值无效，记录警告并跳过
      if (!tinycolor(colorKey).isValid()) {
        console.warn(`Invalid color key: ${colorKey}`);
        continue;
      }

      // Convert the color key to RGB object and destructure to get r, g, b values
      // 将颜色键值转换为 RGB 对象，并解构得到 r、g、b 值
      const { r, g, b } = this.getColorPaletteMap(colorKey);

      // Calculate the Euclidean distance squared between the current color and the target color
      // 计算当前颜色与目标颜色的欧几里德距离平方
      const currentDistanceSq =
        Math.pow(targetRGB.r - r, 2) +
        Math.pow(targetRGB.g - g, 2) +
        Math.pow(targetRGB.b - b, 2);

      // If the current distance is 0, update the minimum distance and nearest color, then break out of the loop
      // 如果当前距离为0，更新最小距离和最接近颜色并跳出循环
      if (currentDistanceSq === 0) {
        minDistanceSq = currentDistanceSq;
        nearestColor = colorEntry;
        break;
      }

      // If the current distance is smaller, update the minimum distance and nearest color
      // 如果当前距离更小，更新最小距离和最接近颜色
      if (currentDistanceSq < minDistanceSq) {
        minDistanceSq = currentDistanceSq;
        nearestColor = colorEntry;
      }
    }

    // Return the result
    // 返回结果
    if (nearestColor) {
      return {
        ...nearestColor,
        distance: Math.sqrt(minDistanceSq),
      };
    } else {
      // If no nearest color is found, return a default value or throw an error
      // 如果没有找到最接近颜色，返回一个默认值或者抛出错误
      throw new Error(`No nearest color found for: ${color}`);
    }
  }

  /**
   * Create a NearestColor instance from an existing color palette
   * 从现有颜色调色板创建 NearestColor 实例
   * @param {Array<ColorEntry>} availableColors - Array containing key-value pairs of colors 包含颜色键值对的数组
   * @returns {FindNearestColor} - New NearestColor instance 新的 NearestColor 实例
   */
  static from(availableColors: ColorEntry[]): NearestColor {
    return new NearestColor(availableColors);
  }

  /**
   * Add additional colors to the existing palette and create a new NearestColor instance
   * 添加额外的颜色到现有调色板，并创建新的 NearestColor 实例
   * @param {Array<ColorEntry>} alternateColors - Array containing additional color key-value pairs 包含额外颜色键值对的数组
   * @returns {ColorMatcher} - New NearestColor instance 新的 NearestColor 实例
   */
  concat(alternateColors: ColorEntry[]): NearestColor {
    const extendedColors = this.colorPalette.concat(alternateColors);
    return new NearestColor(extendedColors);
  }
}

export default NearestColor;
