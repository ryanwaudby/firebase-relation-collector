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
  "members": {
    "mymembership": {
      "friends": {
          "member1": true,
          "member3": true
        }
      },
      "member1": { "some": "member" },
      "member2": { "not": "a friend" },
      "member3": { "my": "other friend" }
    }
}
```


```js
import { collect } from 'firebase-relation-collector';

// You should auth this ref if required
const ref = new Firebase('your-firebase');

// Defaults to last in path 'items'
collect(ref, 'accounts/myaccount/items')
  .then(console.log); // [{ "id": "child1", "some": "prop" }, { "id": "child2" }]

// Specify a location of relations
collect(ref, 'members/mymembership/friends', 'members')
  .then(console.log) // [{ "some": "member", "my": "other friend" }]

```
[npm-url]: https://www.npmjs.com/package/firebase-relation-collector
[npm-image]: https://img.shields.io/npm/v/firebase-relation-collector.svg

[downloads-image]: https://img.shields.io/npm/dm/firebase-relation-collector.svg
