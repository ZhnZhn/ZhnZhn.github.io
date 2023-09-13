import {
  useState,
  useCallback,
  focusRefElement
} from '../uiApi';

const useToggleMenuMore = (
  refBtMore
) => {
  const [
    isMenuMore,
    setIsMenuMore
  ] = useState(false)
  /*eslint-disable react-hooks/exhaustive-deps */
  , toggleIsMenuMore = useCallback(() => {
      setIsMenuMore(is => {
        if (is) {
          focusRefElement(refBtMore)
        }
        return !is;
      })
  }, []);
  // refBtMore
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isMenuMore,
    toggleIsMenuMore
  ];
}

export default useToggleMenuMore
