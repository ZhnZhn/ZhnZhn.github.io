import {
  useRef,
  useState,
  useCallback,
  focusRefElement
} from '../uiApi';

const useMenuMore = () => {
  const refBtMenuMore = useRef()
  , [
    isMenuMore,
    setIsMenuMore
  ] = useState(false)
  , toggleMenuMore = useCallback(() => {
      setIsMenuMore(is => {
        if (is) {
          focusRefElement(refBtMenuMore)
        }
        return !is;
      })
  }, []);
  return [
    refBtMenuMore,
    isMenuMore,
    toggleMenuMore
  ];
}

export default useMenuMore
