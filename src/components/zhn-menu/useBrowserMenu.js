import {
  useRef,
  useEffect,
  focusRefElement
} from '../uiApi';

const useBrowserMenu = (
  isShow,
  menu
) => {
  const refFirstItem = useRef();

  useEffect(() => {
    if (isShow && menu) {
      focusRefElement(refFirstItem)
    }
  }, [isShow, menu])

  return refFirstItem;
}

export default useBrowserMenu
