import tinycolor from 'tinycolor2';
import { DEFAULT_COLORS } from './utils/defaultColors';

interface ColorEntry {
  key: string;
  [key: string | number | symbol]: any;
}

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface ClosestColorResult {
  key: string;
  [key: string | number | symbol]: any;
  distance: number;
}

class ClosestColor {
  colorPalette: ColorEntry[];
  constructor(colorPalette: ColorEntry[] = DEFAULT_COLORS) {
    this.colorPalette = colorPalette;
  }

  // 调色板缓存
  private colorPaletteMap: Map<string | RGB, RGB> = new Map();

  private getColorPaletteMap(color: string | RGB): RGB {
    // 检查是否有缓存
    if (this.colorPaletteMap.has(color)) {
      return this.colorPaletteMap.get(color)!;
    }

    // 如果没有缓存，则进行颜色转换并缓存结果
    const rgb = tinycolor(color).toRgb();
    this.colorPaletteMap.set(color, rgb);
    return rgb;
  }

  /**
   * 寻找最接近的颜色
   * @param {string | RGB} color - 要匹配的颜色（支持 hex、rgb 字符串或 RGB 对象）
   * @returns {ClosestColorResult} - 最接近颜色的对象，包含颜色键值对和距离信息
   */
  find(color: string | RGB): ClosestColorResult {
    // 如果颜色不符合规则，抛出错误
    if (!tinycolor(color).isValid()) {
      throw new Error(`Invalid color: ${color}`);
    }

    // 将颜色其转换为 RGB 对象
    const targetRGB = tinycolor(color).toRgb();

    // 初始化最小距离平方为无穷大
    let minDistanceSq = Infinity;

    // 存储最接近颜色对象的变量
    let closestColor;

    // 遍历颜色调色板
    for (const colorEntry of this.colorPalette) {
      // 获取颜色键值
      const colorKey = colorEntry.key;
      // 如果颜色键值无效，记录警告并跳过
      if (!tinycolor(colorKey).isValid()) {
        console.warn(`Invalid color key: ${colorKey}`);
        continue;
      }

      // 将颜色键值转换为 RGB 对象，并解构得到 r、g、b 值
      const { r, g, b } = this.getColorPaletteMap(colorKey);

      // 计算当前颜色与目标颜色的欧几里德距离平方
      const currentDistanceSq =
        Math.pow(targetRGB.r - r, 2) +
        Math.pow(targetRGB.g - g, 2) +
        Math.pow(targetRGB.b - b, 2);

      // 如果当前距离为0，更新最小距离和最接近颜色并跳出循环
      if (currentDistanceSq === 0) {
        minDistanceSq = currentDistanceSq;
        closestColor = colorEntry;
        break;
      }

      // 如果当前距离更小，更新最小距离和最接近颜色
      if (currentDistanceSq < minDistanceSq) {
        minDistanceSq = currentDistanceSq;
        closestColor = colorEntry;
      }
    }

    // 返回结果
    if (closestColor) {
      return {
        ...closestColor,
        distance: Math.sqrt(minDistanceSq),
      };
    } else {
      // 如果没有找到最接近颜色，返回一个默认值或者抛出错误
      throw new Error(`No closest color found for: ${color}`);
    }
  }

  /**
   * 从现有颜色调色板创建 ClosestColor 实例
   * @param {Array<ColorEntry>} availableColors - 包含颜色键值对的数组
   * @returns {FindClosestColor} - 新的 ClosestColor 实例
   */
  static from(availableColors: ColorEntry[]): ClosestColor {
    return new ClosestColor(availableColors);
  }

  /**
   * 添加额外的颜色到现有调色板，并创建新的 ClosestColor 实例
   * @param {Array<ColorEntry>} alternateColors - 包含额外颜色键值对的数组
   * @returns {ColorMatcher} - 新的 ClosestColor 实例
   */
  concat(alternateColors: ColorEntry[]): ClosestColor {
    const extendedColors = this.colorPalette.concat(alternateColors);
    return new ClosestColor(extendedColors);
  }
}

export default ClosestColor;
