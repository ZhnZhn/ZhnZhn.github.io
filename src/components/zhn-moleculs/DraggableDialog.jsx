import {
  isFn,
  useRef,
  getEventComposedPath,
  stopDefaultFor
} from '../uiApi';

import {
  crDialogRole
} from '../a11yFn';

import {
  CL_TOGGLE_ARROW,
  crDialogCn,
  crShowHide,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import {
  isKeyEscape,
  isHotKey
} from '../hooks/fUseKey';
import useXYMovable from '../hooks/useXYMovable';
import useDialogFocus from './useDialogFocus';

import { RowFlexReverseStart } from '../dialogs/rows/RowFlex';
import FlatButton from '../zhn-m/FlatButton';
import DialogCaption from './DialogCaption';

const CL_DRAGGABLE_DIALOG = crDialogCn("draggable-dialog")
, S_DIALOG_DIV = {
  ...crAbsoluteTopLeftStyle(30, 50),
  zIndex: 10
}
, S_MR_57 = {
  marginRight: 57
}
, BT_HOT_KEY_LOAD = "L"
, BT_HOT_KEY_OPEN = "O"
, BT_HOT_KEY_CLOSE = "C";

const CommandButtons = ({
  onLoad,
  onShow,
  onClose
}) => (
  <RowFlexReverseStart>
    {
      isFn(onLoad) && <FlatButton
        key="load"
        caption="Load"
        title="Load item"
        hotKey2={BT_HOT_KEY_LOAD}
        onClick={onLoad}
      />
    }
    {
      isFn(onShow) && <FlatButton
        key="open"
        timeout={0}
        caption="Open"
        title="Open items"
        hotKey2={BT_HOT_KEY_OPEN}
        onClick={onShow}
      />
    }
    <FlatButton
      key="close"
      timeout={0}
      style={S_MR_57}
      caption="Close"
      title="Close dialog"
      hotKey2={BT_HOT_KEY_CLOSE}
      onClick={onClose}
    />
  </RowFlexReverseStart>
);

const FN_NOOP = () => {};
const isExcludeElement = (
  evt
) => ((getEventComposedPath(evt))[1] || {}).className === CL_TOGGLE_ARROW

const _applyHotKeyHandler = (evt, onFn) => {
  stopDefaultFor(evt)
  if (isFn(onFn)) {
    onFn()
  }
}

const DraggableDialog = ({
  isFocusBtMenu=true,
  isShow,
  style,
  menuModel,
  caption,
  children,
  toTopLayer,
  onLoad,
  onShow,
  onClose=FN_NOOP
}) => {
  const refRoot = useRef()
  , refBtMenu = useRef()
  , _hKeyDown = (evt) => {
    if (isKeyEscape(evt) || isHotKey(evt, BT_HOT_KEY_CLOSE)) {
      _applyHotKeyHandler(evt, onClose)
    } else if (isHotKey(evt, BT_HOT_KEY_LOAD)) {
      _applyHotKeyHandler(evt, onLoad)
    } else if (isHotKey(evt, BT_HOT_KEY_OPEN)) {
      _applyHotKeyHandler(evt, onShow)
    }
  }
  , [
    _className,
    _showHideStyle
  ] = crShowHide(
    isShow,
    CL_DRAGGABLE_DIALOG
  );

  useDialogFocus(
    isShow,
    isFocusBtMenu ? refBtMenu : void 0
  )
  useXYMovable(refRoot, isExcludeElement)

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
      {...crDialogRole(isShow, caption)}
      ref={refRoot}
      className={_className}
      style={{
        ...style,
        ...S_DIALOG_DIV,
        ..._showHideStyle
      }}
      onClick={toTopLayer}
      onKeyDown={_hKeyDown}
     >
    {/*eslint-enable jsx-a11y/no-static-element-interactions*/}
      <DialogCaption
         refBtMenuMore={refBtMenu}
         menuModel={menuModel}
         caption={caption}
         onClose={onClose}
      />
      {children}
      <CommandButtons
         onLoad={onLoad}
         onShow={onShow}
         onClose={onClose}
      />
    </div>
  );
};

export default DraggableDialog
