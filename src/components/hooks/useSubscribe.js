import { useSyncExternalStore } from '../uiApi';
import useRefInit from './useRefInit';

const useSubscribe = (
  store,
  selector,
  onChange
) => {
  useSyncExternalStore(
    ...useRefInit(() => [
      () => store.subscribe(selector, onChange),
      () => selector(store.getState())
    ])
  )
};

export default useSubscribe
