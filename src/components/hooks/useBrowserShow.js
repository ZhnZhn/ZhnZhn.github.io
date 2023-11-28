import useBool from './useBool';

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
    hideBrowser
  ];
};

export default useBrowserShow
