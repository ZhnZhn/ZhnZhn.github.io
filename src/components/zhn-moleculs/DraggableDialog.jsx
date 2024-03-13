import {
  isFn,
  useRef
} from '../uiApi';
import { crDialogRole } from '../a11yFn';

import {
  crDialogCn,
  crShowHide
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
  position: 'absolute',
  top: 30,
  left: 50,
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

const DraggableDialog = ({
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
  const refBtMenuMore = useRef()
  , refRoot = useDialogFocus(
     isShow,
     refBtMenuMore
  )
  , _hKeyDown = useKeyEscape(onClose)
  , [
    _className,
    _showHideStyle
  ] = crShowHide(
    isShow,
    CL_DRAGGABLE_DIALOG
  );

  useXYMovable(refRoot)

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
         refBtMenuMore={refBtMenuMore}
         menuModel={menuModel}
         caption={caption}
         onClose={onClose}
      />
      <div>
         {children}
      </div>
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
