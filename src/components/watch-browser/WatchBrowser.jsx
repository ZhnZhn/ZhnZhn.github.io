import { useState } from '../uiApi';
import { crScrollYCn } from '../styleFn';

import useToggle from '../hooks/useToggle';
import useBool from '../hooks/useBool';
import useListen from '../hooks/useListen';

import {
  saveWatchList,
  showDialogEditGroups,
  showDialogEditLists
} from './Handlers';

import A from '../Comp';
import EditBar from './EditBar';
import WatchGroups from './WatchGroups';

const CL_SCROLL_WATCH = crScrollYCn('scroll-watch')
, S_BROWSER = { paddingRight: 0 }
, S_BT_CIRCLE = {
  position: 'relative',
  top: -6,
  marginLeft: 20
};

const WatchBrowser = ({
  isInitShow,
  caption,
  store,
  browserType,
  showAction,
  updateAction
}) => {
  const [
    isModeEdit,
    _toggleEditMode
  ] = useToggle()
  , [
    isShow,
    _hShow,
    _hHide
  ] = useBool(isInitShow)
  , [
    watchList,
    setWatchList
  ] = useState(() => store.getWatchList());

  useListen((actionType, data) => {
     if (actionType === showAction && data === browserType ){
      _hShow()
    } else if (actionType === updateAction) {
      setWatchList({...data})
    }
  })

  const _captionEV = isModeEdit ? 'V' : 'E'
  , { groups } = watchList || {};

  return (
    <A.Browser isShow={isShow} style={S_BROWSER}>
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
