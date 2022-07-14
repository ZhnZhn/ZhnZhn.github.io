import {
  useRef,
  useEffect,
  focusRefElement
} from '../uiApi';

const useFocus = (
  isShow
) => {
  const ref = useRef();
  useEffect(() => {
    if (isShow) {
      focusRefElement(ref)
    }
  }, [isShow])
  return ref;
};

export default useFocus
