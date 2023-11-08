import {
  forwardRef,
  useRef
} from '../uiApi';

import {
  crDialogCn,
  crShowHide,
  crElementCn
} from '../styleFn';

import { useKeyEscape } from '../hooks/fUseKey';
import useMenuMore from '../hooks/useMenuMore';
import useDialogFocus from './useDialogFocus';

import { BtSvgClose } from '../zhn/BtSvgX';
import FlatButton from '../zhn-m/FlatButton';
import FocusTrap from './FocusTrap';
import MenuMore from './MenuMore';

import {
  S_ROOT_DIV,
  S_CAPTION_DIV,
  S_SVG_CLOSE,
  S_COMMAND_DIV
} from './Dialog.Style';

const CL_MODAL_DIALOG = crDialogCn('modal-dialog')
, CL_EL = crElementCn()
, S_ROOT_DIV_MODAL = {
  ...S_ROOT_DIV,
  display: 'block',
  position: 'absolute',
  top: '20%',
  left: '50%',
  width: 380,
  marginLeft: -190,
  zIndex: 10
};

const CommandButtons = ({
  refBtClose,
  commandButtons,
  withoutClose,
  onClose
}) => (
  <div style={S_COMMAND_DIV}>
    {commandButtons}
    {!withoutClose &&
       <FlatButton
         key="close"
         refBt={refBtClose}
         caption="Close"
         title="Close Modal Dialog"
         timeout={0}
         onClick={onClose}
       />
    }
  </div>
);

const FN_NOOP = () => {};
const _hClickDialog = evt => {
  evt.stopPropagation()
}

const ModalDialog = forwardRef(({
  refFocusFirts,
  refFocusLast,
  isShow,
  style,
  menuModel,
  caption,
  styleCaption,
  commandButtons,
  withoutClose,
  isWithButton=true,
  children,
  timeout=450,
  onClose=FN_NOOP
}, ref) => {
  const refBtClose = useRef()
  , [
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
    CL_MODAL_DIALOG
  );

  return (
    <FocusTrap
      refEl={refRoot}
      refFirst={refFocusFirts || refBtMenuMore}
      refLast={refFocusLast || refBtClose}
      style={_showHideStyle}
    >
    {/*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/}
     <div
        ref={refRoot}
        role="dialog"
        tabIndex="-1"
        aria-label={caption}
        aria-hidden={!isShow}
        className={_className}
        style={{
          ...S_ROOT_DIV_MODAL,
          ...style,
          ..._showHideStyle
        }}
        onClick={_hClickDialog}
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
            <span style={styleCaption}>
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
         {isWithButton && <CommandButtons
            refBtClose={!withoutClose && isShow
              ? refBtClose
              : void 0
            }
            commandButtons={commandButtons}
            withoutClose={withoutClose}
            onClose={onClose}
         />}
    </div>
    </FocusTrap>
  );
});

export default ModalDialog
