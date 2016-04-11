import {expect}       from 'chai';
import {fetch}        from '../src/index.js';
import FirebaseServer from 'firebase-server';
import Firebase       from 'firebase';

const {describe, it} = global;

const startServer = (hostname, data) => new FirebaseServer(5000, hostname, data);

describe('fetch', () => {
  it('collects childs correctly', async () => {
    const data = {
      "accounts": {
        "myaccount": {
          "items": {
            "child1": true,
            "child2": true
          }
        }
      },
      "items": {
        "child1": { "id": "child1", "some": "prop" },
        "child2": { "id": "child2" },
        "child3": { "id": "child3" }
        }
    };

    startServer('ws://localhost.firebaseio.com', data);

    const ref = new Firebase('ws://localhost.firebaseio.com:5000');
    const children = await fetch(ref, 'accounts/myaccount/items');

    expect(children).to.deep.equal([{ id: 'child1', some: 'prop' }, { id: 'child2' }]);
  });
});
