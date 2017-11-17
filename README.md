# Roving tabindex element list

[![Build Status](https://travis-ci.org/tajakobsen/roving-tabindex-element-list.svg?branch=master)](https://travis-ci.org/tajakobsen/roving-tabindex-element-list)
[![npm version](https://badge.fury.io/js/roving-tabindex-element-list.svg)](https://badge.fury.io/js/roving-tabindex-element-list)

JavaScript library that keeps a list of Elements that can be navigated using tab. This is very useful when working
with accessibility.

Usage:
```javascript
import NavigationList from 'roving-tabindex-element-list';

const navigationList = new NavigationList(); 

navigationList.registerElement(element1);
navigationList.registerElement(element2);

// congratulations, you can now use arrow keys + HOME + END to move between the elements in the list 
```
