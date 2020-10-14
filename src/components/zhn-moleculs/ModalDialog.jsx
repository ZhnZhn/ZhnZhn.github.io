import React, { forwardRef, useRef, useCallback, useEffect, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";
import use from '../hooks/use'

import { focusNode } from '../zhn-utils/utils'

import SvgClose from '../zhn/SvgClose'
import FlatButton from '../zhn-m/FlatButton'

import STYLE from './Dialog.Style'

const {
  useKeyEscape,
  useTheme,
  useForceUpdate
} = use;

const TH_ID = 'MODAL_DIALOG';

const CL = {
  MD: 'modal-dialog',
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};

const S = {
  ...STYLE,
  ROOT_DIV_MODAL: {
    display: 'block',
    position: 'absolute',
    top: '20%',
    //left: '30%',
    left: '50%',
    width: 380,
    marginLeft: -190,
    zIndex: 10
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  },
};

const CommandButtons = ({
  commandButtons,
  withoutClose,
  onClose
}) => {
  return (
    <div style={S.COMMAND_DIV}>
      {commandButtons}
      { !withoutClose &&
          <FlatButton
            key="close"
            style={S.BT}
            caption="Close"
            title="Close Modal Dialog"
            onClick={onClose}
          />
      }
    </div>
  );
};

const DF_ON_CLOSE = () => {};

const ModalDialog = forwardRef(({
  isShow,
  style,
  caption,
  styleCaption,
  commandButtons,
  withoutClose,
  isWithButton=true,
  children,
  timeout=450,
  onClose=DF_ON_CLOSE
}, ref) => {
  const _refRoot = useRef()
  , _refPrevFocused = useRef()
  , _refWasClosing = useRef(false)
  , _refIsShow = useRef(isShow)
  , _focus = useCallback(() => {
     _refPrevFocused.current = document.activeElement
     focusNode(_refRoot.current)
  }, [])
  , _focusPrev = useCallback(() => {
     focusNode(_refPrevFocused.current)
    _refPrevFocused.current = null
  }, [])
  , _hClick = useCallback(event => {
     event.stopPropagation()
  }, [])
   /*eslint-disable react-hooks/exhaustive-deps */
  , _hClose = useCallback(() => {
      onClose()
      _focusPrev()
  }, [onClose])
  /* _focusPrev */
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyDown = useKeyEscape(_hClose, [_hClose])
  , forceUpdate = useForceUpdate()[1]
  , TS = useTheme(TH_ID);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(_focus, [])
  /* _focus */

  useEffect(() => {
    if (!_refIsShow.current && isShow) {
      _focus()
    }
    _refIsShow.current = isShow
  })
  /* _focus */

  useEffect(() => {
    if (_refWasClosing.current) {
      setTimeout(forceUpdate, timeout)
    }
  })

  useImperativeHandle(ref, () => ({
    focus: _focus,
    focusPrev: _focusPrev
  }), [])
  /* focus, _focusPrev */
  /*eslint-enable react-hooks/exhaustive-deps */

  let _className, _style;
  if (_refWasClosing.current){
    _style = S.HIDE
    _refWasClosing.current = false
  } else {
    _className = isShow ? CL.SHOWING : CL.HIDING
    _style = isShow ? S.SHOW : S.HIDE_POPUP
    if (!isShow){
      _refWasClosing.current = true
    }
  }

  return (
    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
     <div
        ref={_refRoot}
        role="dialog"
        tabIndex="-1"
        aria-label={caption}
        aria-hidden={!isShow}
        className={`${CL.MD} ${_className}`}
        style={{
          ...S.ROOT_DIV, ...S.ROOT_DIV_MODAL,
          ...style, ..._style,
          ...TS.ROOT, ...TS.EL_BORDER
        }}
        onClick={_hClick}
        onKeyDown={_hKeyDown}
     >
     {/*eslint-enable jsx-a11y/no-noninteractive-element-interactions*/}
         <div style={{...S.CAPTION_DIV, ...TS.EL}}>
            <span style={styleCaption}>{caption}</span>
            <SvgClose
              style={S.SVG_CLOSE}
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
})

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
