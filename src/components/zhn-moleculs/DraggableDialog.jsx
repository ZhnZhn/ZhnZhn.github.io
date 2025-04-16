import {
  isFn,
  useRef,
  getEventComposedPath
} from '../uiApi';
import { crDialogRole } from '../a11yFn';

import {
  CL_TOGGLE_ARROW,
  crDialogCn,
  crShowHide,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import { useKeyEscape } from '../hooks/fUseKey';
import useXYMovable from '../hooks/useXYMovable';
import useDialogFocus from './useDialogFocus';

import { RowFlexEnd } from '../dialogs/rows/RowFlex';
import FlatButton from '../zhn-m/FlatButton';
import DialogCaption from './DialogCaption';

import {
  S_ROOT_DIV,
  S_BT_LOAD
} from './Dialog.Style';

const CL_DRAGGABLE_DIALOG = crDialogCn("draggable-dialog")
, S_DIALOG_DIV = {
  ...S_ROOT_DIV,
  ...crAbsoluteTopLeftStyle(30, 50),  
  zIndex: 10
};

const CommandButtons = ({
  buttons,
  onLoad,
  onShow,
  onClose
}) => (
  <RowFlexEnd>
    {buttons}
    {
      isFn(onLoad) && <FlatButton
        key="load"
        style={S_BT_LOAD}
        caption="Load"
        title="Load item"
        onClick={onLoad}
      />
    }
    {
      isFn(onShow) && <FlatButton
        key="show"
        timeout={0}
        caption="Show"
        title="Show items"
        onClick={onShow}
      />
    }
    <FlatButton
      key="close"
      timeout={0}
      caption="Close"
      title="Close dialog"
      onClick={onClose}
    />
  </RowFlexEnd>
);

const FN_NOOP = () => {};
const isExcludeElement = (
  evt
) => ((getEventComposedPath(evt))[1] || {}).className === CL_TOGGLE_ARROW

const DraggableDialog = ({
  isFocusBtMenu=true,
  isShow,
  style,
  menuModel,
  caption,
  children,
  commandButtons,
  toTopLayer,
  onLoad,
  onShow,
  onClose=FN_NOOP
}) => {
  const refRoot = useRef()
  , refBtMenu = useRef()
  , _hKeyDown = useKeyEscape(onClose)
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
         buttons={commandButtons}
         onLoad={onLoad}
         onShow={onShow}
         onClose={onClose}
      />
    </div>
  );
};

export default DraggableDialog
