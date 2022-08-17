import { 
  useRef,
  useMemo
} from '../uiApi';

const useRefBool = initialValue => {
  const ref = useRef(initialValue)
  , [
    setTrue,
    setFalse
  ] = useMemo(() => [
    () => ref.current = true,
    () => ref.current = false
  ], []);
  return [ref, setTrue, setFalse];
};

export default useRefBool
