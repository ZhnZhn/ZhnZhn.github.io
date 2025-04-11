import { useSyncExternalStore } from '../uiApi';
import { useRefInit } from './useProperty';

const useSubscribeState = (
  store,
  selector
) => useSyncExternalStore(
    ...useRefInit(() => [
      (rerender) => store.subscribe(selector, rerender),
      () => selector(store.getState())
    ])
);

export default useSubscribeState
