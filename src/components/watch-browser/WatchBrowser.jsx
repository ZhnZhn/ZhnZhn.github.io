import { useMemo } from '../uiApi';
import { crScrollYCn } from '../styleFn';

import { useToggle } from '../hooks/useToggle';
import useBrowserShow from '../hooks/useBrowserShow';

import {
  saveWatchList,
  showDialogEditGroups,
  showDialogEditLists
} from './Handlers';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import {
  crToolbarButton,
  ToolbarButtonCircle
} from '../zhn/ToolbarButtonCircle';
import ScrollPane from '../zhn/ScrollPane';

import EditBar from './EditBar';
import WatchGroups from './WatchGroups';

const CL_SCROLL_WATCH = crScrollYCn('scroll-watch')
, S_TOOLBAR = { paddingTop: 0 };

const useToolbarButtons = (
  saveWatchList,
  onClickInfo,
  descrUrl
/*eslint-disable react-hooks/exhaustive-deps */
) => {
  const [
    isModeEdit,
    _toggleEditMode
  ] = useToggle();
  return [
    isModeEdit,
    useMemo(() => [
      crToolbarButton('S', 'Save to LocalStorage', saveWatchList),
      crToolbarButton(isModeEdit ? 'V' : 'E' , 'Toggle Edit Mode: E/V', _toggleEditMode)
    ], [isModeEdit])
  ];
}
// saveWatchList, _toggleEditMode
/*eslint-enable react-hooks/exhaustive-deps */

const WatchBrowser = (props) => {
  const {
    caption,
    useWatchList,
  } = props
  , [
    isShow,
    _hHide,
    hKeyDown
  ] = useBrowserShow(props)
  , watchList = useWatchList()
  , { groups } = watchList || {}
  , [
    isModeEdit,
    _toolbarButtons
  ] = useToolbarButtons(saveWatchList);

  return (
    <Browser
      isShow={isShow}
      onKeyDown={hKeyDown}
    >
       <BrowserCaption
         caption={caption}
         onClose={_hHide}
       />
      <ToolbarButtonCircle style={S_TOOLBAR}>
        {_toolbarButtons}
      </ToolbarButtonCircle>
      <EditBar
         isShow={isModeEdit}
         onClickGroup={showDialogEditGroups}
         onClickList={showDialogEditLists}
      />
      <ScrollPane className={CL_SCROLL_WATCH}>
        <WatchGroups
           isModeEdit={isModeEdit}
           groups={groups}
        />
      </ScrollPane>
   </Browser>
  );
}

export default WatchBrowser
