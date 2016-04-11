import { expect }     from 'chai';
import { collect }    from '../src/index.js';
import FirebaseServer from 'firebase-server';
import Firebase       from 'firebase';

const {describe, it} = global;

const host = 'ws://localhost.firebaseio.com';
const startServer = (hostname, data) =>
  new FirebaseServer(5000, hostname, data);

let server;

before(() => {
  const data = {
    accounts: {
      myaccount: {
        items: {
          child1: true,
          child2: true
        }
      }
    },
    items: {
      child1: { id: 'child1', some: 'prop' },
      child2: { id: 'child2' },
      child3: { id: 'child3' }
    },
    members: {
      mymembership: {
        friends: {
          member1: true,
          member3: true
        }
      },
      member1: { some: 'member' },
      member2: { not: 'a friend' },
      member3: { my: 'other friend' }
    }
  };
  server = startServer(host, data);
});

after(() => {
  server.close();
});

describe('collect', () => {
  it('collects relations with default key', async () => {
    const ref = new Firebase(`${host}:5000`);
    const path = 'accounts/myaccount/items';
    const relations = await collect(ref, path);

    expect(relations).to.deep.equal([
      { id: 'child1', some: 'prop' },
      { id: 'child2' }
    ]);
  });

  it('collects relations with specifc key', async () => {
    const ref = new Firebase(`${host}:5000`);
    const path = 'members/mymembership/friends';
    const relations = await collect(ref, path, 'members');

    expect(relations).to.deep.equal([
      { some: 'member' },
      { my: 'other friend' }
    ]);
  });
});
