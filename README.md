# Firebase relation collector

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

A npm module that will collect your firebase relationships with ease.

## Install

``
npm install firebase-relation-collector --save
``

## Basic Usage (ES2015)
```js
{
    "accounts": {
        "myaccount": {
            "items": {
                "lsjzlt1l8i": true,
                "oii1aobqms": true
            }
        }
    },
    "items": {
        "lsjzlt1l8i": { "id": "child1", "some": "prop" },
        "oii1aobqms": { "id": "child2" },
        "ojvdq9uqug": { "id": "child3", "not": "mine" }
        }
    }
}
```


```js
import { fetch } from 'firebase-relation-collector';

// You should auth this ref if required
const ref = new Firebase('your-firebase');
    
fetch(ref, 'accounts/myaccount/items').then(items => {
    console.log(items); // [{ "id": "child1", "some": "prop" }, { "id": "child2" }]
});
```
[npm-url]: https://www.npmjs.com/package/firebase-relation-collector
[npm-image]: https://img.shields.io/npm/v/firebase-relation-collector.svg

[downloads-image]: https://img.shields.io/npm/dm/firebase-relation-collector.svg
