import tinycolor from 'tinycolor2';

interface ColorEntry {
  key: string;
  [key: string]: any;
}

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface ClosestColorResult {
  key: string;
  [key: string]: any;
  distance: number;
}

const DEFAULT_COLORS = [
  {
    key: '#0ff',
    nameList: ['湖绿色', 'Aqua', 'Turquoise', '蓝翠绿色', '碧绿色'],
  },
  {
    key: '#000',
    nameList: [
      '黑色',
      '深黑色',
      'Black',
      'Jet Black',
      'Shadow Black',
      '漆黑色',
      '黯黑色',
    ],
  },
  {
    key: '#00f',
    nameList: ['湛蓝色', 'Royal Blue', 'Deep Blue', '宝蓝色', '蓝海色'],
  },
  {
    key: '#f0f',
    nameList: ['紫红色', 'Magenta', 'Fuchsia', '洋红色', '紫红色'],
  },
  { key: '#808080', nameList: ['灰色', 'Gray', 'Neutral Gray', '中灰色'] },
  {
    key: '#008000',
    nameList: ['翠绿色', 'Emerald Green', 'Lush Green', '绿色', '翠绿色'],
  },
  {
    key: '#0f0',
    nameList: ['鲜绿色', 'Lime', 'Zesty Green', '活力绿', '柠檬绿色'],
  },
  {
    key: '#800000',
    nameList: ['褐红色', 'Maroon', 'Deep Burgundy', '栗红色', '褐梅红色'],
  },
  {
    key: '#000080',
    nameList: [
      '深蓝色',
      'Nautical Navy',
      'Midnight Blue',
      '海军蓝色',
      '深夜蓝色',
    ],
  },
  {
    key: '#808000',
    nameList: ['橄榄色', 'Olive', 'Earthy Olive', '橄榄绿色', '自然橄榄色'],
  },
  {
    key: '#ffa500',
    nameList: ['橙色', 'Orange', 'Citrus Orange', '活力橙色', '柑橘橙色'],
  },
  {
    key: '#800080',
    nameList: ['紫色', 'Purple', 'Royal Violet', '皇家紫色', '深紫色'],
  },
  {
    key: '#f00',
    nameList: ['红色', 'Crimson Red', 'Fiery Red', '猩红色', '火焰红色'],
  },
  {
    key: '#c0c0c0',
    nameList: ['银灰色', 'Silver Gray', 'Metallic Silver', '银色', '金属银色'],
  },
  {
    key: '#008080',
    nameList: ['蓝绿色', 'Teal', 'Turquoise', '湖绿色', '蓝翠绿色'],
  },
  {
    key: '#fff',
    nameList: ['纯白色', 'Snow White', 'Pure White', '雪白色', '纯净白色'],
  },
  {
    key: '#ff0',
    nameList: ['明黄色', 'Sunny Yellow', 'Golden Yellow', '阳光黄色', '金黄色'],
  },
];

/**
 * 寻找最接近的颜色
 * @param {string | RGB} color - 要匹配的颜色（支持 hex、rgb 字符串或 RGB 对象）
 * @param {Array<ColorEntry>} colorPalette - 包含颜色键值对的数组
 * @returns {ClosestColorResult} - 最接近颜色的对象，包含颜色键值对和距离信息
 */
export const findClosestColor = (
  color: string | RGB,
  colorPalette: ColorEntry[] | undefined,
): ClosestColorResult => {
  // 如果颜色不符合规则，抛出错误
  if (!tinycolor(color).isValid()) {
    throw new Error(`Invalid color: ${color}`);
  }

  // 将颜色其转换为 RGB 对象
  const targetRGB: RGB = tinycolor(color).toRgb();

  // 初始化最小距离平方为无穷大
  let minDistanceSq: number = Infinity;

  // 存储最接近颜色对象的变量
  let closestColor: ColorEntry | undefined;

  const colorPaletteList =
    colorPalette !== undefined ? colorPalette : DEFAULT_COLORS;

  // 遍历颜色调色板
  for (const colorEntry of colorPaletteList) {
    // 获取颜色键值
    const colorKey: string = colorEntry.key;
    // 如果颜色键值无效，记录警告并跳过
    if (!tinycolor(colorKey).isValid()) {
      console.warn(`Invalid color key: ${colorKey}`);
      continue;
    }

    // 将颜色键值转换为 RGB 对象，并解构得到 r、g、b 值
    const { r, g, b }: RGB = tinycolor(colorKey).toRgb();

    // 计算当前颜色与目标颜色的欧几里德距离平方
    const currentDistanceSq: number =
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
};
