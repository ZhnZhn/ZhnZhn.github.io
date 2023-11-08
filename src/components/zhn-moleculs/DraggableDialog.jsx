import { forwardRef } from '../uiApi';
import {
  crDialogCn,
  crShowHide,
  crElementCn
} from '../styleFn';

import useMenuMore from '../hooks/useMenuMore';
import { useKeyEscape } from '../hooks/fUseKey';
import useXYMovable from '../hooks/useXYMovable';
import useDialogFocus from './useDialogFocus';

import { BtSvgClose } from '../zhn/BtSvgX';
import FlatButton from '../zhn-m/FlatButton';

import MenuMore from './MenuMore';

import {
  S_ROOT_DIV,
  S_CAPTION_DIV,
  S_COMMAND_DIV,
  S_BT_LOAD,
  S_SVG_CLOSE
} from './Dialog.Style';

const CL_DRAGGABLE_DIALOG = crDialogCn("draggable-dialog")
, CL_NOT_SELECTED = "not-selected"
, CL_EL = crElementCn()
, S_DIALOG_DIV = {
  ...S_ROOT_DIV,
  position: 'absolute',
  top: 30,
  left: 50,
  zIndex: 10
};

const _isFn = fn => typeof fn === 'function';

const CommandButtons = ({
  buttons,
  onLoad,
  onShow,
  onClose
}) => (
  <div style={S_COMMAND_DIV}>
    {buttons}
    {
      _isFn(onLoad) && <FlatButton
        key="load"
        style={S_BT_LOAD}
        caption="Load"
        title="Load item"
        onClick={onLoad}
      />
    }
    {
      _isFn(onShow) && <FlatButton
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
  </div>
);

const FN_NOOP = () => {};

const DraggableDialog = forwardRef(({
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
}, ref) => {
  const [
    refBtMenuMore,
    isMenuMore,
    toggleMenuMore
  ] = useMenuMore()
  , refRoot = useDialogFocus(
     isShow,
     ref,
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

  return (
    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    <div
      ref={refRoot}
      role="dialog"
      tabIndex="-1"
      aria-label={caption}
      aria-hidden={!isShow}
      className={_className}
      style={{
        ...style,
        ...S_DIALOG_DIV,
        ..._showHideStyle
      }}
      onClick={toTopLayer}
      onKeyDown={_hKeyDown}
     >
    {/*eslint-enable jsx-a11y/no-noninteractive-element-interactions*/}
      <div className={CL_EL} style={S_CAPTION_DIV}>
        <MenuMore
          ref={refBtMenuMore}
          isMore={isMenuMore}
          menuModel={menuModel}
          toggle={toggleMenuMore}
        />
        <span className={CL_NOT_SELECTED}>
          {caption}
        </span>
        <BtSvgClose
           style={S_SVG_CLOSE}
           onClick={onClose}
        />
      </div>
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
})

export default DraggableDialog
