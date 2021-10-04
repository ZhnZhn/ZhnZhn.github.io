//import PropTypes from "prop-types";

import COLOR from '../styles/Color';

import useTheme from '../hooks/useTheme';
import SvgMore from './SvgMore';
import SvgCheckBox from './SvgCheckBox';
import SvgClose from './SvgClose';

const TH_ID = 'ELEMENT';

const CL_GAP_RIGHT = 'gap-right'
, CL_NOT_SELECTED = 'not-selected';

const S_ROOT = {
  position: 'relative',
  backgroundColor: '#1b2836',
  height: 34,
  padding: '0 42px 0 10px',
  marginBottom: 10,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'clip'
},
S_CAPTION = {
  position: 'relative',
  top: 6,
  paddingRight: 8,
  fontSize: '18px',
  fontWeight: '500'
},
S_BT_MORE = {
  position: 'relative',
  top: 3
},
S_CHECK_BOX = {
  margin: '0 10px 0 6px'
},
S_SVG_CLOSE = {
  position: 'absolute',
  top: 6,
  right: 0
};


const _isFn = fn => typeof fn === 'function';

const BrowserCaption = ({
  style,
  captionStyle,
  caption,
  children,
  onMore,
  onCheck,
  onUnCheck,
  onClose
}) => {
  const TS = useTheme(TH_ID);
  return (
  <div
    className={CL_GAP_RIGHT}
    style={{...S_ROOT, ...style, ...TS.ROOT}}
  >
     {
       _isFn(onMore) &&
       <SvgMore
          style={S_BT_MORE}
          onClick={onMore}
       />
     }
     {
        (_isFn(onCheck) && _isFn(onUnCheck)) &&
        <SvgCheckBox
           style={S_CHECK_BOX}
           color={COLOR.GREEN}
           checkedColor={TS.ROOT.backgroundColor}
           onCheck={onCheck}
           onUnCheck={onUnCheck}
        />
     }
     <span
        className={CL_NOT_SELECTED}
        style={{...S_CAPTION, ...captionStyle}}
     >
       {caption}
    </span>
    {children}
    <SvgClose
      style={S_SVG_CLOSE}
      onClose={onClose}
    />
  </div>
  );
}
/*
BrowserCaption.propTypes = {
  caption: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onMore: PropTypes.func,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default BrowserCaption
