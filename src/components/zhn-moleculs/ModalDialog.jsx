import {
  forwardRef,
  useRef
} from '../uiApi';

import { crShowHide } from '../styleFn';

import useKeyEscape from '../hooks/useKeyEscape';
import useToggle from '../hooks/useToggle';
import useTheme from '../hooks/useTheme';
import useDialogFocus from './useDialogFocus';

import SvgClose from '../zhn/SvgClose';
import FlatButton from '../zhn-m/FlatButton';
import FocusTrap from './FocusTrap';
import MenuMore from './MenuMore';

import {
  S_ROOT_DIV,
  S_CAPTION_DIV,
  S_SVG_CLOSE,
  S_COMMAND_DIV,
  S_BT
} from './Dialog.Style';

const TH_ID = 'MODAL_DIALOG'
, CL_MD = 'modal-dialog'
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
         style={S_BT}
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
    refRoot,
    refBtMore
  ] = useDialogFocus(
    ref,
    isShow
  )
  , _hKeyDown = useKeyEscape(onClose)
  , [
    isMore,
    toggleIsMore
  ] = useToggle(false)
  , TS = useTheme(TH_ID)
  , [
    _className,
    _showHideStyle
  ] = crShowHide(
    isShow,
    CL_MD
  );

  return (
    <FocusTrap
      refEl={refRoot}
      refFirst={refFocusFirts || refBtMore}
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
          ..._showHideStyle,
          ...TS.ROOT,
          ...TS.EL_BORDER
        }}
        onClick={_hClickDialog}
        onKeyDown={_hKeyDown}
     >
     {/*eslint-enable jsx-a11y/no-noninteractive-element-interactions*/}
         <div style={{...S_CAPTION_DIV, ...TS.EL}}>
           <MenuMore
             ref={refBtMore}
             isMore={isMore}
             menuModel={menuModel}
             TS={TS}
             toggle={toggleIsMore}
           />
            <span style={styleCaption}>
              {caption}
            </span>
            <SvgClose
              style={S_SVG_CLOSE}
              onClose={onClose}
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
