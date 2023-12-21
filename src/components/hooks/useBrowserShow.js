import { HAS_KEYBOARD_FOCUS } from '../has';

import useBool from './useBool';
import { useKeyEscape } from './fUseKey';

const useBrowserShow = ({
  isInitShow,
  useMsBrowserShow,
  browserType
}) => {
  const [
    isShow,
    showBrowser,
    hideBrowser
  ] = useBool(isInitShow);

  useMsBrowserShow(msBrowserShow => {
    if (msBrowserShow && msBrowserShow.browserType === browserType) {
      showBrowser()
    }
  })

  return [
    isShow,
    hideBrowser,
    /*eslint-disable react-hooks/rules-of-hooks*/
    HAS_KEYBOARD_FOCUS && useKeyEscape(hideBrowser)
    /*eslint-enable react-hooks/rules-of-hooks*/
  ];
};

export default useBrowserShow
