import { useCallback } from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';

import D from '../dialogs/DialogCell';

const S_DIALOG = { width: 300 }
, S_ROW_TEXT = { paddingRight: 16 };

const AlphaSectorDialog = memoIsShow(({
  isShow,
  caption,
  toTopLayer,
  onAbout,
  loadId,
  dfSubId,
  onLoad,
  onShow,
  onClose
}) => {
  const [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onAbout)
  , _toolbarButtons = useToolbar({ onAbout })
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

  return (
    <D.DraggableDialog
      isShow={isShow}
      style={S_DIALOG}
      caption={caption}
      menuModel={menuMoreModel}
      toTopLayer={toTopLayer}
      onLoad={_hLoad}
      onShow={onShow}
      onClose={onClose}
    >
      <D.Toolbar
        isShow={isToolbar}
        buttons={_toolbarButtons}
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
