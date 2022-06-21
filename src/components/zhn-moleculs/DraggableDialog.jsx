//import PropTypes from "prop-types";
import {
  forwardRef,
  useEffect
} from 'react';

import use from '../hooks/use';
import useDialogFocus from './useDialogFocus';

import crCn from '../zhn-utils/crCn';

import SvgClose from '../zhn/SvgClose';
import FlatButton from '../zhn-m/FlatButton';

import MenuMore from './MenuMore';

import Interact from '../../utils/Interact';

import {
  S_SHOW,
  S_HIDE,
  S_ROOT_DIV,
  S_CAPTION_DIV,
  S_COMMAND_DIV,
  S_BT,
  S_BT_LOAD,
  S_SVG_CLOSE
} from './Dialog.Style';

const {
  useToggle,
  useKeyEscape,
  useTheme
} = use;

const TH_ID = 'DRAGGABLE_DIALOG'

, CL_DRAGGABLE_DIALOG = "draggable-dialog"
, CL_SHOWING = 'show-popup'
, CL_NOT_SELECTED = 'not-selected'
, S_DIALOG_DIV = {
  ...S_ROOT_DIV,
  position: 'absolute',
  top: 30,
  left: 50,
  zIndex: 10
}
, S_CHILDREN_DIV = { cursor: 'default' };

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
        style={S_BT}
        caption="Show"
        title="Show items"
        onClick={onShow}
      />
    }
    <FlatButton
      key="close"
      timeout={0}
      style={S_BT}
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
    refRoot,
    refBtMore
  ] = useDialogFocus(ref, isShow)
  , _hKeyDown = useKeyEscape(onClose)
  , [
    isMore,
    toggleIsMore
  ] = useToggle(false)
  , TS = useTheme(TH_ID)
  , _className = crCn(
      CL_DRAGGABLE_DIALOG,
      [isShow, CL_SHOWING]
    )
  , _styleShow = isShow
      ? S_SHOW : S_HIDE;

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(()=>{
    Interact.makeDragable(refRoot.current);
  }, [])
  // refRoot
  /*eslint-enable react-hooks/exhaustive-deps */

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
        ..._styleShow,
        ...TS.ROOT,
        ...TS.EL_BORDER
      }}
      onClick={toTopLayer}
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
        <span className={CL_NOT_SELECTED}>
          {caption}
        </span>
        <SvgClose
           style={S_SVG_CLOSE}
           onClose={onClose}
        />
      </div>
      <div style={S_CHILDREN_DIV}>
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
  toTopLayer: PropTypes.func,
  onLoad: PropTypes.func,
  onShow: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default DraggableDialog
