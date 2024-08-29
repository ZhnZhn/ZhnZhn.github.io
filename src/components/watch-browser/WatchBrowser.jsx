import { crScrollYCn } from '../styleFn';

import useToggle from '../hooks/useToggle';
import useBrowserShow from '../hooks/useBrowserShow';

import {
  saveWatchList,
  showDialogEditGroups,
  showDialogEditLists
} from './Handlers';

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ScrollPane from '../zhn/ScrollPane';
import ButtonCircle from '../zhn/ButtonCircle';
import EditBar from './EditBar';
import WatchGroups from './WatchGroups';

const CL_SCROLL_WATCH = crScrollYCn('scroll-watch')
, S_BT_CIRCLE = {
  position: 'relative',
  top: -6,
  marginLeft: 20
};

const WatchBrowser = (props) => {
  const {
    caption,
    useWatchList,
  } = props
  , [
    isModeEdit,
    _toggleEditMode
  ] = useToggle()
  , [
    isShow,
    _hHide,
    hKeyDown
  ] = useBrowserShow(props)
  , watchList = useWatchList()
  , { groups } = watchList || {}
  , _captionEV = isModeEdit ? 'V' : 'E';

  return (
    <Browser
      isShow={isShow}
      onKeyDown={hKeyDown}
    >
       <BrowserCaption
         caption={caption}
         onClose={_hHide}
       >
        <ButtonCircle
          caption="S"
          title="Save to LocalStorage"
          style={S_BT_CIRCLE}
          onClick={saveWatchList}
        />
        <ButtonCircle
           caption={_captionEV}
           title="Toggle Edit Mode: E/V"
           style={S_BT_CIRCLE}
           onClick={_toggleEditMode}
        />
      </BrowserCaption>
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
