# @lostelk/nearest-color

[![npm](https://img.shields.io/npm/v/@lostelk/nearest-color?color=blue)](https://www.npmjs.com/package/@lostelk/nearest-color)
[![GitHub issues](https://img.shields.io/github/issues/LostElkByte/nearest-color)](https://github.com/LostElkByte/nearest-color/issues)
[![npm](https://img.shields.io/npm/dt/@lostelk/nearest-color)](https://www.npmjs.com/package/@lostelk/nearest-color)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/@lostelk/nearest-color)
[![NPM](https://img.shields.io/npm/l/@lostelk/nearest-color)](http://opensource.org/licenses/MIT)
[![Build Status](https://app.travis-ci.com/LostElkByte/nearest-color.svg?branch=main)](https://app.travis-ci.com/LostElkByte/nearest-color)
[![Coverage Status](https://coveralls.io/repos/github/nihaojob/popular-message/badge.svg?branch=main)](https://coveralls.io/github/nihaojob/popular-message?branch=main)

[English](README.md) · [简体中文](README.ZH.md)
<!-- [English](https://www.npmjs.com/package/@lostelk/nearest-color#@lostelk/nearest-color) · [简体中文](https://github.com/LostElkByte/nearest-color/blob/main/README.ZH.md) -->

Find the nearest color in a given color palette. ✨

**_Suitable for both browser and Node environments._**

## Getting Started

### Using in Node and Browser

#### 1.Install

- Install as an npm dependency

  ```sh
  $ npm i @lostelk/nearest-color
  ```

- Load from CDN

  ```js
  <script src="https://unpkg.com/@lostelk/nearest-color"></script>
  ```

#### 2.Import

- CommonJS

  ```js
  const NearestColor = require('@lostelk/nearest-color');
  ```

- ES Module

  ```js
  import NearestColor from '@lostelk/nearest-color';
  ```

#### 3.Use

- Find the nearest color - Default Color Palette

  > Use the `find` method to find the nearest color in the default color palette. (Supports Hex, RGB, HSL, HSV)

  ```js
  const findNearestColor = new NearestColor();

  const result = findNearestColor.find('#f0f0f6');
  ```

  > Result

  ```js
  {
    category: "white",
    key: "#f5f5f5",
    english: ["whitesmoke", "white"],
    chinese: ["烟白色", "白色"],
    distance: 7.14142842854285
  }
  ```

- Find the nearest color - Custom Color Palette

  > Import a custom color palette through the constructor or the from method.

  ```js
  const CUSTOM_PALETTE = [
    {
      key: '#3498db',
      name: ['Blue'],
    },
    {
      key: '#e74c3c',
      name: ['Red'],
    },
    {
      key: '#27ae60',
      name: ['Green'],
    },
    // Add more colors...
  ];
  ```

  ```js
  // Import a custom color palette through the constructor
  const nearestColor = new NearestColor(CUSTOM_PALETTE);

  // Or import through the `from` method
  const nearestColor = NearestColor.from(CUSTOM_PALETTE);

  const result = nearestColor.find('#2563eb');
  ```

  > Result

  ```js
  {
    key: '#3498db',
    name: ['Blue'],
    distance: 57.358521598799946
  }

  ```

- Find the nearest color - Add Additional Colors to the Existing Palette

  > Use the concat method to add additional colors to the existing color palette

  ```js
  const ADDITIONAL_PALETTE = [
    {
      key: '#ffcc00',
      names: ['Yellow'],
    },
    {
      key: '#9900cc',
      names: ['Purple'],
    },
    // Add more colors...
  ];
  ```

  ```js
  const nearestColor = new NearestColor();

  const nearestColorNew = nearestColor.concat(ADDITIONAL_PALETTE);

  const result = nearestColorNew.find('#e0b60f');
  ```

  > Result

  ```js
  {
    key: '#ffcc00',
    names: [ 'Yellow' ],
    distance: 40.8656334834051
  }
  ```

## API

### new NearestColor(colorPalette)

Create a new instance of the NearestColor class.

**colorPalette** - colorPalette is an optional parameter, an array containing color objects, serving as a custom color palette.

---

### find(color)

**Returns：{ key: Any, distance: Number，... }**

Method to find the nearest color.

**color** - Color to match, supports Hex, RGB, HSL, and HSV formats.

**returns** - Contains information related to the nearest color, such as color key-value pairs and distance.

---

### from(colorPalette)

**Returns：new NearestColor(colorPalette)**

Create a NearestColor instance using a custom color palette.

**colorPalette** - Array containing key-value pairs of colors, serving as a custom color palette.

**returns** - New NearestColor instance based on the provided custom color palette.

---

### concat(newColorPalette)

**Returns：new NearestColor({...oldColorPalette, ...newColorPalette})**

Add additional colors to the existing color palette and create a new NearestColor instance.

**newColorPalette** - Array containing additional color key-value pairs, representing colors to be added to the current palette.

**returns** - New NearestColor instance containing the extended color palette.
