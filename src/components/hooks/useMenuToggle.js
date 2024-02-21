import {
  useState,
  useCallback,
  focusRefElement
} from '../uiApi';

const useMenuToggle = (
  refBtMenuMore
) => {
  const [
    isShow,
    setIsShow
  ] = useState(false)
  /*eslint-disable react-hooks/exhaustive-deps */
  , toggle = useCallback(() => {
      setIsShow(is => {
        if (is) {
          focusRefElement(refBtMenuMore)
        }
        return !is;
      })
  }, []);
  //refBtMenuMore
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isShow,
    toggle
  ];
}

export default useMenuToggle
