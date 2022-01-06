import { useEffect } from 'react';
import store from '../../flux/stores/ChartStore';

/*eslint-disable react-hooks/exhaustive-deps */
const useListen = (onStore, propNameListen='listen') => {
  useEffect(() => {
    const unsubscribe = store[propNameListen](onStore)
    return unsubscribe;
  }, [])
  return store;
};
/*eslint-enable react-hooks/exhaustive-deps */

export default useListen
