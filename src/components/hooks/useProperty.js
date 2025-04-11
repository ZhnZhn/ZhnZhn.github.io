import {
  useRef,
  useMemo
} from '../uiApi';

export const useProperty = (
  initialValue,
  dfValue
) => {
  const ref = useRef(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps */
  return useMemo(() => [
    //setValue
    v => { ref.current = v },
    //getValue
    () => ref.current || dfValue
  ], []);
  // dfValue
  /*eslint-enable react-hooks/exhaustive-deps */
}

export const useRefBool = initialValue => {
  const ref = useRef(initialValue)
  , [
    setTrue,
    setFalse
  ] = useMemo(() => [
    () => ref.current = true,
    () => ref.current = false
  ], []);
  return [ref, setTrue, setFalse];
}

export const useRefInit = crValue => {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = crValue()
  }
  return ref.current;
}
