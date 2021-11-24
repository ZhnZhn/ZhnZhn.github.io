import { forwardRef, useCallback } from 'react';
//import PropTypes from "prop-types";
import use from '../hooks/use';
import useDialogFocus from './useDialogFocus'

import crCn from '../zhn-utils/crCn';

import SvgClose from '../zhn/SvgClose';
import FlatButton from '../zhn-m/FlatButton';

import MenuMore from './MenuMore';

import STYLE from './Dialog.Style';

const {
  useKeyEscape,
  useToggle,
  useTheme
} = use;

const TH_ID = 'MODAL_DIALOG'

, CL_MD = 'modal-dialog'
, CL_SHOWING = 'show-popup'

, S_ROOT_DIV_MODAL = {
  display: 'block',
  position: 'absolute',
  top: '20%',
  left: '50%',
  width: 380,
  marginLeft: -190,
  zIndex: 10
};

const CommandButtons = ({
  commandButtons,
  withoutClose,
  onClose
}) => (
  <div style={STYLE.COMMAND_DIV}>
    {commandButtons}
    { !withoutClose &&
        <FlatButton
          key="close"
          style={STYLE.BT}
          caption="Close"
          title="Close Modal Dialog"
          onClick={onClose}
        />
    }
  </div>
);

const DF_ON_CLOSE = () => {};

const ModalDialog = forwardRef(({
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
  onClose=DF_ON_CLOSE
}, ref) => {
  const [
    refRoot, refBtMore
  ] = useDialogFocus(ref, isShow)
  , _hClick = useCallback(event => {
     event.stopPropagation()
  }, [])
  , _hKeyDown = useKeyEscape(onClose)
  , [isMore, toggleIsMore] = useToggle(false)
  , TS = useTheme(TH_ID)
  , _style = isShow ? STYLE.SHOW : STYLE.HIDE
  , _className = crCn(CL_MD, [isShow, CL_SHOWING]);

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
          ...STYLE.ROOT_DIV, ...S_ROOT_DIV_MODAL,
          ...style, ..._style,
          ...TS.ROOT, ...TS.EL_BORDER
        }}
        onClick={_hClick}
        onKeyDown={_hKeyDown}
     >
     {/*eslint-enable jsx-a11y/no-noninteractive-element-interactions*/}
         <div style={{...STYLE.CAPTION_DIV, ...TS.EL}}>
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
              style={STYLE.SVG_CLOSE}
              onClose={onClose}
            />
         </div>
         <div>
           {children}
         </div>
         {isWithButton && <CommandButtons
            commandButtons={commandButtons}
            withoutClose={withoutClose}
            onClose={onClose}
         />}
    </div>
  );
});

/*
 ModalDialog.propTypes = {
   isShow: PropTypes.bool,
   isWithButton: PropTypes.bool,
   withoutClose: PropTypes.bool,
   style: PropTypes.object,
   caption: PropTypes.string,
   styleCaption: PropTypes.object,
   timeout: PropTypes.number,
   commandButtons: PropTypes.arrayOf(PropTypes.element),
   onClose: PropTypes.func
 }
 */

export default ModalDialog
