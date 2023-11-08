//import PropTypes from "prop-types";
import {
  crStyle3,
  crElementCn,
  crElementBorderCn
} from '../styleFn';

import useToggle from '../hooks/useToggle';
import useFnFocus from '../hooks/useFnFocus';

import { GREEN_COLOR } from '../styles/Color';

import Comp from '../Comp';
import Button from '../zhn/Button';
import { BtSvgClose } from '../zhn/BtSvgX';
import ValueMovingBadge from './ValueMovingBadge';
import ValueDate from './ValueDate';

const {
  SvgMore,
  ModalSlider,
  SvgCheckBox
} = Comp;

const CL_ITEM_HEADER = crElementCn("item-header")
, CL_CHARTS_MENU_MORE = crElementBorderCn("popup-menu charts__menu-more")
, CL_CAPTION = "not-selected text-clip bt-left bt"
, COLOR_SVG_MORE = "#777777"

, S_BT_MORE = {
  position: 'relative',
  top: 4,
  left: 2
},
S_SVG_MORE = {
  stroke: COLOR_SVG_MORE,
  fill: COLOR_SVG_MORE
}
, S_MODAL_SLIDER = {
  display: 'inline-block'
}
, S_CHECK_BOX = {
  position: 'relative',
  top: 2,
  margin: '0 6px 0 8px'
},
S_CAPTION = {
  color: '#a487d4',
  width: 125,
  padding: '4px 0 2px 4px'
}
, S_CAPTION_CLOSE = {
  color: 'grey'
}
, S_CAPTION_WIDTH = {
  width: void 0,
  maxWidth: 'calc(100% - 60px)'
}
, S_CLOSE = {
  position: 'absolute',
  right: 0,
  top: 6
};

const MenuMore = ({
  isMore,
  moreModel,
  onToggle
}) => {
  const [
    refBtSvg,
    toggleFocus
  ] = useFnFocus(onToggle);

  return moreModel ? (<>
      <SvgMore
        ref={refBtSvg}
        style={S_BT_MORE}
        svgStyle={S_SVG_MORE}
        onClick={onToggle}
      />
      <ModalSlider
        isShow={isMore}
        rootStyle={S_MODAL_SLIDER}
        className={CL_CHARTS_MENU_MORE}
        model={moreModel}
        onClose={toggleFocus}
      />
    </>) : null;
  }

const Header = ({
  isOpen,
  onCheck,
  onUnCheck,

  itemCaption,
  itemValue,
  itemTime,
  onToggle,

  valueMoving,
  isAdminMode,
  crValueMoving,
  refVm,

  moreModel,
  onClose
}) => {
  const [
    isMore,
    _toggleMore
  ] = useToggle(false)
  , _captionStyle = crStyle3(
     S_CAPTION,
     !isOpen && S_CAPTION_CLOSE,
     !valueMoving && S_CAPTION_WIDTH
  )
  , _btTitle = itemCaption.length > 15
      ? itemCaption
      : void 0;

  return (
    <div className={CL_ITEM_HEADER}>
      <MenuMore
        isMore={isMore}
        moreModel={moreModel}
        onToggle={_toggleMore}
      />
      <SvgCheckBox
         style={S_CHECK_BOX}
         color={GREEN_COLOR}
         onCheck={onCheck}
         onUnCheck={onUnCheck}
      />
      <Button
         className={CL_CAPTION}
         style={_captionStyle}
         title={_btTitle}
         onClick={onToggle}
      >
         {itemCaption}
      </Button>
      {
        valueMoving
          ? <ValueMovingBadge
              ref={refVm}
              isAdminMode={isAdminMode}
              initialVm={valueMoving}
              crValueMoving={crValueMoving}
            />
          : <ValueDate
              value={itemValue}
              strDate={itemTime}
            />
      }
      <BtSvgClose
        style={S_CLOSE}
        onClick={onClose}
      />
    </div>
  );
}

/*
Header.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  chartType : PropTypes.string.isRequired,
  moreModel: PropTypes.object,
  onCheck : PropTypes.func.isRequired,
  onUnCheck : PropTypes.func.isRequired,
  itemCaption : PropTypes.string.isRequired,
  itemTime : PropTypes.string,
  onToggle : PropTypes.func.isRequired,
  valueMoving : PropTypes.object,
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
  onClose : PropTypes.func.isRequired
}
*/

export default Header
