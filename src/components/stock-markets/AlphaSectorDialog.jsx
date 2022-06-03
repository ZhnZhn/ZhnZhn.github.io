import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useCommandButtons from '../dialogs/hooks/useCommandButtons';

import D from '../dialogs/DialogCell';

const S_DIALOG = { width: 300 }
, S_ROW_TEXT = { paddingRight: 16 };

const AlphaSectorDialog = memoIsShow(({
  isShow,
  caption,
  loadId,
  dfSubId,
  onLoad,
  onShow,
  onFront,
  onClose,
  onClickInfo
}) => {
  const [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onClickInfo)
  , _refToolbarButtons = useRef([{
    caption: 'A',
    title: 'About Datasouce',
    onClick: onClickInfo
  }])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(()=>{
    onLoad({
      loadId,
      dfSubId,
      indicator: 'SECTOR'
    })
  }, [])
  // onLoad, loadId, dfSubId
  /*eslint-enable react-hooks/exhaustive-deps */
  , _commandButtons = useCommandButtons(_hLoad)

  return (
    <D.DraggableDialog
         isShow={isShow}
         style={S_DIALOG}
         caption={caption}
         menuModel={menuMoreModel}
         commandButtons={_commandButtons}
         onShowChart={onShow}
         onFront={onFront}
         onClose={onClose}
     >
         <D.Toolbar
            isShow={isToolbar}
            buttons={getRefValue(_refToolbarButtons)}
         />
         <D.Row.Text
           styleRoot={S_ROW_TEXT}
           caption="AV:"
           text="Sector Performances"
         />
    </D.DraggableDialog>
  );
})

export default AlphaSectorDialog
