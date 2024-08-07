import { useCallback } from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';

import D from '../dialogs/DialogCell';

const S_DIALOG = { width: 310 }
, S_ROW_TEXT = { paddingRight: 16 };

const AlphaTopDialog = memoIsShow(({
  isShow,
  caption,
  toTopLayer,
  onAbout,
  loadId,
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
      dfSubId: 'GL',
      dfFn: 'GL'
    })
  }, [])
  // onLoad, loadId
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
      <D.RowText
        style={S_ROW_TEXT}
        caption="AV:"
        text="Top Gainers & Losers"
      />
    </D.DraggableDialog>
  );
})

export default AlphaTopDialog
