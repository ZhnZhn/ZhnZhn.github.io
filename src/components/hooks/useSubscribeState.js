import { useSyncExternalStore } from '../uiApi';
import useRefInit from './useRefInit';

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
