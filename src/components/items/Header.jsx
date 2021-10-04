//import PropTypes from "prop-types";

import COLOR from '../styles/Color'

import use from '../hooks/use'
import Comp from '../Comp'
import ValueMovingBadge from './ValueMovingBadge';

const {
  SvgMore,
  ModalSlider,
  SvgCheckBox,
  SvgClose
} = Comp;

const {
  crStyle,
  useTheme, useToggle, useFnFocus
} = use;

const TH_ID = 'ELEMENT';

const CL_CAPTION = 'not-selected text-clip bt-left bt'
, CL_MORE = "popup-menu charts__menu-more";

const S = {
  ROOT: {
    backgroundColor: '#1b2836',
    height: 'auto',
    width: '100%',
    paddingRight: 42,
    paddingBottom: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  BT_MORE: {
    position: 'relative',
    top: 3,
    left: 2
  },
  SVG_MORE: {
    stroke: '#777777',
    fill: '#777777'
  },
  ROOT_MORE: {
    display: 'inline-block'
  },
  CHECK_BOX: {
    position: 'relative',
    top: 1,
    marginRight: 8,
    marginLeft: 8
  },
  CAPTION_OPEN : {
    color: '#a487d4',
    width: 125,
    paddingTop: 4,
    paddingBottom: 2
  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    width: void 0,
    //maxWidth: 250,
    maxWidth: 'calc(100% - 60px)'
  },
  TIME: {
    color: '#fdb316',
    paddingLeft: 16,
    fontWeight: 'bold'
  },
  CLOSE: {
    position: 'absolute',
    right: 0,
    top: 4
  }
};

const ItemTime = ({ itemTime }) => itemTime
  ? <span style={S.TIME}>{itemTime}</span>
  : null;

const MenuMore = ({
  isMore,
  moreModel,
  sliderStyle,
  onToggle
}) => {
  const [refBtSvg, toggleFocus] = useFnFocus(onToggle);

  if (!moreModel) return null;
  return (<>
      <SvgMore
        ref={refBtSvg}
        style={S.BT_MORE}
        svgStyle={S.SVG_MORE}
        onClick={onToggle}
      />
      <ModalSlider
        isShow={isMore}
        rootStyle={S.ROOT_MORE}
        className={CL_MORE}
        style={sliderStyle}
        model={moreModel}
        onClose={toggleFocus}
      />
    </>);
  }

const Header = ({
  isOpen,
  onCheck, onUnCheck,
  itemCaption, itemTitle, itemTime, onToggle,
  valueMoving, isAdminMode, crValueMoving, refVm,
  moreModel,
  onClose
}) => {
  const [isMore, _toggleMore] = useToggle(false)
  , TS = useTheme(TH_ID)
  , _captionStyle = crStyle([
     S.CAPTION_OPEN,
     !isOpen && S.CAPTION_CLOSE,
     !valueMoving && S.CAPTION_WIDTH
  ]);

  return (
    <div style={{...S.ROOT, ...TS.ROOT }}>
      <MenuMore
        isMore={isMore}
        moreModel={moreModel}
        sliderStyle={TS.BORDER}
        onToggle={_toggleMore}
      />
      <SvgCheckBox
         style={S.CHECK_BOX}
         color={COLOR.GREEN}
         checkedColor={TS.ROOT.backgroundColor}
         onCheck={onCheck}
         onUnCheck={onUnCheck}
      />
      <button
         className={CL_CAPTION}
         title={itemTitle}
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
              itemType={itemTime}
            />
      }
      <SvgClose
        style={S.CLOSE}
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
  itemTitle : PropTypes.string.isRequired,
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
