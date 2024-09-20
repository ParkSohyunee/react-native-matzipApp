// multiple refs
// (Reference - https://mayursinhsarvaiya.medium.com/how-to-merge-refs-in-react-component-d5e4623b6924)

import {ForwardedRef} from 'react';

const mergeRefs = <T>(...refs: ForwardedRef<T>[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
};

export {mergeRefs};
