import {
  useRef,
  setRefValue,
  getRefValue
} from '../uiApi';

const useWasShown = (isShow) => {
  const _refWasShown = useRef(false);
  if (isShow) {
    setRefValue(_refWasShown, true)
  }
  return getRefValue(_refWasShown);
};

export default useWasShown
