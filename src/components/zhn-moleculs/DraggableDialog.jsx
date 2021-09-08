import { forwardRef, useRef, useCallback, useEffect, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";
import use from '../hooks/use';
import focusNode from '../zhn-utils/focusNode';
import crCn from '../zhn-utils/crCn';

import SvgClose from '../zhn/SvgClose';
import FlatButton from '../zhn-m/FlatButton';

import MenuMore from './MenuMore';

import Interact from '../../utils/Interact';

import STYLE from './Dialog.Style';

const {
  useToggle,
  useKeyEscape,
  useTheme
} = use;

const TH_ID = 'DRAGGABLE_DIALOG';

const CL = {
  ROOT: "draggable-dialog",
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

const S = {
  ...STYLE,
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: 30,
    left: 50,
    zIndex: 10
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
};

const _isFn = fn => typeof fn === 'function';

const CommandButtons = ({
  buttons,
  onShow,
  onClose
}) => (
  <div style={S.COMMAND_DIV}>
    {buttons}
    {
      _isFn(onShow) && <FlatButton
        key="show"
        timeout={0}
        style={S.BT}
        caption="Show"
        title="Show Item Container"
        //accessKey="s"
        onClick={onShow}
      />
    }
    <FlatButton
      key="close"
      timeout={0}
      style={S.BT}
      caption="Close"
      title="Close Draggable Dialog"
      //accessKey="c"
      onClick={onClose}
    />
  </div>
);

const _getCurrent = ref => ref.current
const DF_ON_CLOSE = () => {}

const DraggableDialog = forwardRef(({
  isShow,
  menuModel,
  caption,
  children,
  commandButtons,
  onShowChart,
  onFront,
  onClose=DF_ON_CLOSE
}, ref) => {
  const _refRootDiv = useRef()
  , _refBtMore = useRef()
  , _refPrevFocused = useRef()
  , _refIsShow = useRef(isShow)
  , _focus = useCallback(() => {
      _refPrevFocused.current = document.activeElement
      focusNode(_getCurrent(_refBtMore) || _getCurrent(_refRootDiv))
  }, [])
  , _focusPrev = useCallback(()=>{
      focusNode(_getCurrent(_refPrevFocused))
      _refPrevFocused.current = null
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClose = useCallback(() => {
       onClose()
       _focusPrev()
     }, [onClose])
  /* _focusPrev */
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyDown = useKeyEscape(_hClose, [_hClose])
  , [isMore, toggleIsMore] = useToggle(false)
  , TS = useTheme(TH_ID)
  , _styleShow = isShow ? S.SHOW : S.HIDE
  , _className = crCn(CL.ROOT, [isShow, CL.SHOWING]);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    Interact.makeDragable(_refRootDiv.current);
    _focus()
  }, [])
  useEffect(()=>{
    if (isShow && !_refIsShow.current) {
      _focus()
    }
    _refIsShow.current = isShow
  }, [isShow])
  /* _focus */
  /*eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(ref, () => ({
    focus: _focus,
    focusPrev: _focusPrev
  }))


  return (
    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    <div
      ref={_refRootDiv}
      role="dialog"
      tabIndex="-1"
      aria-label={caption}
      aria-hidden={!isShow}
      className={_className}
      style={{
        ...S.ROOT_DIV, ...S.ROOT_DIV_DRAG,
        ..._styleShow,
        ...TS.ROOT, ...TS.EL_BORDER
      }}
      onClick={onFront}
      onKeyDown={_hKeyDown}
     >
    {/*eslint-enable jsx-a11y/no-noninteractive-element-interactions*/}
      <div style={{...S.CAPTION_DIV, ...TS.EL}}>
        <MenuMore
          ref={_refBtMore}
          isMore={isMore}
          menuModel={menuModel}
          TS={TS}
          toggle={toggleIsMore}
        />
        <span className={CL.NOT_SELECTED}>
          {caption}
        </span>
        <SvgClose
           style={S.SVG_CLOSE}
           onClose={_hClose}
        />
      </div>
      <div style={S.CHILDREN_DIV}>
         {children}
      </div>
      <CommandButtons
        buttons={commandButtons}
        onShow={onShowChart}
        onClose={_hClose}
      />
    </div>
  );
})

/*
DraggableDialog.propTypes = {
  isShow: PropTypes.bool,
  menuModel: PropTypes.object,
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  commandButtons: PropTypes.arrayOf(PropTypes.element),
  onShowChart: PropTypes.func,
  onFront: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default DraggableDialog
