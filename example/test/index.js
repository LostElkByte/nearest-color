import ClosestColor from '../../dist/index.esm.js';

const DEFAULT_COLORS = [
  {
    key: '#0ff',
    nameList: ['湖绿色1', 'Aqua', 'Turquoise', '蓝翠绿色', '碧绿色'],
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

console.time('closestColor');
const findClosestColor = ClosestColor.from(DEFAULT_COLORS);
const a = findClosestColor.find('#0ff');
console.log(a);
console.timeEnd('closestColor');
