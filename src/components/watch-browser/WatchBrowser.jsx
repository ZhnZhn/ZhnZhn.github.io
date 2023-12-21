import { crScrollYCn } from '../styleFn';

import useToggle from '../hooks/useToggle';
import useBrowserShow from '../hooks/useBrowserShow';

import {
  saveWatchList,
  showDialogEditGroups,
  showDialogEditLists
} from './Handlers';

import A from '../Comp';
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
    <A.Browser
      isShow={isShow}    
      onKeyDown={hKeyDown}
    >
       <A.BrowserCaption
         caption={caption}
         onClose={_hHide}
       >
        <A.ButtonCircle
          caption="S"
          title="Save to LocalStorage"
          style={S_BT_CIRCLE}
          onClick={saveWatchList}
        />
        <A.ButtonCircle
           caption={_captionEV}
           title="Toggle Edit Mode: E/V"
           style={S_BT_CIRCLE}
           onClick={_toggleEditMode}
        />
      </A.BrowserCaption>
      <EditBar
         isShow={isModeEdit}
         onClickGroup={showDialogEditGroups}
         onClickList={showDialogEditLists}
      />
      <A.ScrollPane className={CL_SCROLL_WATCH}>
        <WatchGroups
           isModeEdit={isModeEdit}
           groups={groups}
        />
      </A.ScrollPane>
   </A.Browser>
  );
}

export default WatchBrowser
