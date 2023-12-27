import useShowHideComponent from './useShowHideComponent';

const useBrowserShow = ({
  isInitShow,
  useMsBrowserShow,
  browserType
}) => {
  const [
    isShow,
    showBrowser,
    hideBrowser,
    hKeyDown
  ] = useShowHideComponent(isInitShow);

  useMsBrowserShow(msBrowserShow => {
    if (msBrowserShow && msBrowserShow.browserType === browserType) {
      showBrowser()
    }
  })

  return [
    isShow,
    hideBrowser,
    hKeyDown
  ];
};

export default useBrowserShow
