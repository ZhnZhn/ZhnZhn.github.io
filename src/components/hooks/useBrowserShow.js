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
    useKeyEscape(hideBrowser)
  ];
};

export default useBrowserShow
