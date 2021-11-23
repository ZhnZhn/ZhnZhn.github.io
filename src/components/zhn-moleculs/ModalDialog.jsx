import { forwardRef, useRef, useCallback, useEffect, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";
import use from '../hooks/use';
import useRefFocusPrev from './useRefFocusPrev'

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
  const [refRoot, focus, focusPrev] = useRefFocusPrev()
  , _refIsShow = useRef(isShow)
  , _hClick = useCallback(event => {
     event.stopPropagation()
  }, [])
   /*eslint-disable react-hooks/exhaustive-deps */
  , _hClose = useCallback(() => {
      onClose()
      focusPrev()
  }, [onClose])
  /* focusPrev */
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyDown = useKeyEscape(_hClose, [_hClose])
  , [isMore, toggleIsMore] = useToggle(false)
  , TS = useTheme(TH_ID);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!_refIsShow.current && isShow) {
      focus()
    }
    _refIsShow.current = isShow
  })
  /* focus */
  useImperativeHandle(ref, () => ({
    focus,
    focusPrev
  }), [])
  /* focus, focusPrev */
  /*eslint-enable react-hooks/exhaustive-deps */

  const _style = isShow ? STYLE.SHOW : STYLE.HIDE
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
              onClose={_hClose}
            />
         </div>
         <div>
           {children}
         </div>
         {isWithButton && <CommandButtons
            commandButtons={commandButtons}
            withoutClose={withoutClose}
            onClose={_hClose}
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
