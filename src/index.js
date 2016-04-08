import { last, split, keys, map, pick } from 'ramda';

export const fetch = (ref, path) => {
  return new Promise(resolve => {
    const parentRef = ref.child(path);
    const childId = last(split('/', path));
    const childRef = ref.child(childId);

    parentRef.once('value', snapshot => {
      const childKeys = keys(snapshot.val());

      Promise.all(childKeys.map(key => collect(childRef.child(key))))
        .then(resolve);
    });
  });
};

function collect(ref) {
  return new Promise(resolve => {
    ref.once('value', snapshot => {
      resolve(snapshot.val());
    });
  });
}
