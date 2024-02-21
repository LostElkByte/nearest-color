# @lostelk/nearest-color

[![npm](https://img.shields.io/npm/v/@lostelk/nearest-color?color=blue)](https://www.npmjs.com/package/@lostelk/nearest-color)
[![GitHub issues](https://img.shields.io/github/issues/LostElkByte/nearest-color)](https://github.com/LostElkByte/nearest-color/issues)
[![npm](https://img.shields.io/npm/dt/@lostelk/nearest-color)](https://www.npmjs.com/package/@lostelk/nearest-color)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/@lostelk/nearest-color)
[![NPM](https://img.shields.io/npm/l/@lostelk/nearest-color)](http://opensource.org/licenses/MIT)
[![Build Status](https://app.travis-ci.com/LostElkByte/nearest-color.svg?branch=main)](https://app.travis-ci.com/LostElkByte/nearest-color)
[![Coverage Status](https://coveralls.io/repos/github/LostElkByte/nearest-color/badge.svg?branch=)](https://coveralls.io/github/LostElkByte/nearest-color?branch=)

[English](README.md) · [简体中文](README.ZH.md)

在给定的颜色列表中找到最接近的颜色。✨

**_适用于浏览器和 Node 环境。_**

## 入门

### Node 与 浏览器 中使用

#### 1.安装

- 作为 npm 的依赖项安装

  ```sh
  $ npm i @lostelk/nearest-color
  ```

- 从 CDN 加载

  ```js
  <script src="https://unpkg.com/@lostelk/nearest-color"></script>
  ```

#### 2.导入

- CommonJS

  ```js
  const NearestColor = require('@lostelk/nearest-color');
  ```

- ES Module

  ```js
  import NearestColor from '@lostelk/nearest-color';
  ```

#### 3.使用

- 找到最接近的颜色 - 默认调色板

  > 通过 find 方法在默认的颜色列表中找到最接近的颜色。(支持 Hex、RGB、HSL、HSV)

  ```js
  const findNearestColor = new NearestColor();

  const result = findNearestColor.find('#f0f0f6');
  ```

  > 结果

  ```js
  {
    category: "white",
    key: "#f5f5f5",
    english: ["whitesmoke", "white"],
    chinese: ["烟白色", "白色"],
    distance: 7.14142842854285
  }
  ```

- 找到最接近的颜色 - 自定义颜色调色板

  > 通过构造函数的参数或 from 方法来导入自定义调色板

  ```js
  const CUSTOM_PALETTE = [
    {
      key: '#3498db',
      name: ['蓝', '蓝色'],
    },
    {
      key: '#e74c3c',
      name: ['红', '红色'],
    },
    {
      key: '#27ae60',
      name: ['绿', '绿色'],
    },
    // 添加更多颜色...
  ];
  ```

  ```js
  // 使用构造函数的参数导入自定义调色板
  const nearestColor = new NearestColor(CUSTOM_PALETTE);
  // 或 使用 from 方法来导入自定义调色板
  const nearestColor = NearestColor.from(CUSTOM_PALETTE);

  const result = nearestColor.find('#2563eb');
  ```

  > 结果

  ```js
  {
    key: '#3498db',
    name: ['蓝', '蓝色'],
    distance: 57.358521598799946
  }

  ```

- 找到最接近的颜色 - 将额外的颜色添加到现有的调色板中

  > 通过 concat 方法将额外的颜色添加到现有的调色板中

  ```js
  const ADDITIONAL_PALETTE = [
    {
      key: '#ffcc00',
      names: ['黄', '黄色'],
    },
    {
      key: '#9900cc',
      names: ['紫', '紫色'],
    },
    // 添加更多颜色...
  ];
  ```

  ```js
  const nearestColor = new NearestColor();

  const nearestColorNew = nearestColor.concat(ADDITIONAL_PALETTE);

  const result = nearestColorNew.find('#e0b60f');
  ```

  > 结果

  ```js
  {
    key: '#ffcc00',
    names: [ '黄', '黄色' ],
    distance: 40.8656334834051
  }
  ```

## API

### new NearestColor(colorPalette)

创建 NearestColor 类的新实例。

**colorPalette** - colorPalette 是一个可选参数，为一个包含颜色对象的数组，作为自定义的调色板。

---

### find(color)

**Returns：{ key: Any, distance: Number，... }**

查找最接近的颜色的方法。

**color** - 要匹配的颜色，可以是 Hex、RGB、HSL、HSV 格式。

**returns** - 包含与最接近颜色相关的信息，如颜色键值对和距离等。

---

### from(colorPalette)

**Returns：new NearestColor(colorPalette)**

使用自定义颜色调色板创建 NearestColor 实例。

**colorPalette** - 包含颜色键值对的数组，作为自定义颜色调色板。

**returns** - 新的 NearestColor 实例，基于提供的自定义颜色调色板。

---

### concat(newColorPalette)

**Returns：new NearestColor({...oldColorPalette, ...newColorPalette})**

将额外的颜色添加到现有的调色板中，并创建一个新的 NearestColor 实例。

**newColorPalette** - 包含额外颜色键值对的数组，表示要添加到当前调色板的颜色。

**returns** - 新的 NearestColor 实例，包含扩展后的颜色调色板。
