import {
  useState,
  useEffect
} from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const useSubscribeState = (
  store,
  selector,
  initialState
) => {
  const [
    state,
    setState
  ] = useState(initialState);

  useEffect(
    () => store.subscribe(selector, setState),
    []
  )
  //store, selector

  return state;
}
/*eslint-disable react-hooks/exhaustive-deps */

export default useSubscribeState
