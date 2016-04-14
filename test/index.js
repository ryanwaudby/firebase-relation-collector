import { expect }         from 'chai';
import { collect }        from '../src/index.js';
import FirebaseServer     from 'firebase-server';
import proxyquire         from 'proxyquire';
import originalWebsocket  from 'faye-websocket';

const {describe, it} = global;
const host = 'dummy.firebaseio.test';
const port = 5000;
const startServer = data => new FirebaseServer(port, `localhost:${port}`, data);

describe('collect', () => {
  it('collects relations with default key', async () => {
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
      }
    };

    const ref = new Firebase(`${host}:${port}`);
    const path = 'accounts/myaccount/items';
    const server = startServer(data);
    const relations = await collect(ref, path);

    server.close(() => {
      expect(relations).to.deep.equal([
        { id: 'child1', some: 'prop' },
        { id: 'child2' }
      ]);
    });
  });

  it('collects relations with specifc key', async () => {
    const data = {
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

    const ref = new Firebase(`${host}:${port}`);
    const path = 'members/mymembership/friends';
    const server = startServer(data);
    const relations = await collect(ref, path, 'members');

    server.close(() => {
      expect(relations).to.deep.equal([
        { some: 'member' },
        { my: 'other friend' }
      ]);
    });
  });
});

const Firebase = proxyquire('firebase', {
  'faye-websocket': {
    Client(url) {
      const replaced = url
        .replace(host, 'localhost')
        .replace('wss://', 'ws://');
      return new originalWebsocket.Client(replaced);
    }
  }
});
