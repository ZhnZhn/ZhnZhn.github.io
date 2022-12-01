//import PropTypes from "prop-types";
import useTheme from '../hooks/useTheme';
import useToggle from '../hooks/useToggle';
import useFnFocus from '../hooks/useFnFocus';

import { GREEN_COLOR } from '../styles/Color';
import crStyle from '../zhn-utils/crStyle';

import Comp from '../Comp';
import ValueMovingBadge from './ValueMovingBadge';

const {
  SvgMore,
  ModalSlider,
  SvgCheckBox,
  SvgClose
} = Comp;

const TH_ID = 'ELEMENT';

const CL_ITEM_HEADER = 'item-header'
, CL_MORE = "popup-menu charts__menu-more"
, CL_CAPTION = 'not-selected text-clip bt-left bt'
, CL_ITEM_TIME = 'item-time'

, S_BT_MORE = {
  position: 'relative',
  top: 3,
  left: 2
},
S_SVG_MORE = {
  stroke: '#777777',
  fill: '#777777'
}, S_MODAL_SLIDER = { display: 'inline-block' }
, S_CHECK_BOX = {
  position: 'relative',
  top: 1,
  margin: '0 6px 0 8px'
},
S_CAPTION = {
  color: '#a487d4',
  width: 125,
  padding: '4px 0 2px 4px'
}, S_CAPTION_CLOSE = { color: 'gray' }
, S_CAPTION_WIDTH = {
  width: void 0,
  //maxWidth: 250,
  maxWidth: 'calc(100% - 60px)'
}, S_CLOSE = {
  position: 'absolute',
  right: 0,
  top: 4
};

const ItemTime = ({
  itemTime
}) => itemTime
  ? <span className={CL_ITEM_TIME}>{itemTime}</span>
  : null;

const MenuMore = ({
  isMore,
  moreModel,
  sliderStyle,
  onToggle
}) => {
  const [
    refBtSvg,
    toggleFocus
  ] = useFnFocus(onToggle);

  if (!moreModel) return null;
  return (<>
      <SvgMore
        ref={refBtSvg}
        style={S_BT_MORE}
        svgStyle={S_SVG_MORE}
        onClick={onToggle}
      />
      <ModalSlider
        isShow={isMore}
        rootStyle={S_MODAL_SLIDER}
        className={CL_MORE}
        style={sliderStyle}
        model={moreModel}
        onClose={toggleFocus}
      />
    </>);
  }

const Header = ({
  isOpen,
  onCheck,
  onUnCheck,

  itemCaption,
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
  , TS = useTheme(TH_ID)
  , _captionStyle = crStyle(
     S_CAPTION,
     !isOpen && S_CAPTION_CLOSE,
     !valueMoving && S_CAPTION_WIDTH
  )
  , _btTitle = itemCaption.length > 15
      ? itemCaption : void 0;

  return (
    <div className={CL_ITEM_HEADER} style={TS.ROOT}>
      <MenuMore
        isMore={isMore}
        moreModel={moreModel}
        sliderStyle={TS.BORDER}
        onToggle={_toggleMore}
      />
      <SvgCheckBox
         style={S_CHECK_BOX}
         color={GREEN_COLOR}
         checkedColor={TS.ROOT.backgroundColor}
         onCheck={onCheck}
         onUnCheck={onUnCheck}
      />
      <button
         className={CL_CAPTION}
         title={_btTitle}
         style={_captionStyle}
         onClick={onToggle}
      >
         {itemCaption}
      </button>
      {
        valueMoving
          ? <ValueMovingBadge
              ref={refVm}
              isAdminMode={isAdminMode}
              initialVm={valueMoving}
              crValueMoving={crValueMoving}
            />
          : <ItemTime
              itemTime={itemTime}
            />
      }
      <SvgClose
        style={S_CLOSE}
        onClose={onClose}
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
