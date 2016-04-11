import { last, split, keys, defaultTo } from 'ramda';

export const collect = (ref, path, specificKey) => {
  return new Promise(resolve => {
    const defaultLastInPath = defaultTo(last(split('/', path)));
    const relationPath = defaultLastInPath(specificKey);

    const keysRef = ref.child(path);
    const relationRef = ref.child(relationPath);

    keysRef.once('value', snapshot => {
      const childKeys = keys(snapshot.val());
      Promise.all(childKeys.map(key => fetch(relationRef.child(key))))
        .then(resolve);
    });
  });
};

function fetch(ref) {
  return new Promise(resolve => {
    ref.once('value', snapshot => {
      resolve(snapshot.val());
    });
  });
}
