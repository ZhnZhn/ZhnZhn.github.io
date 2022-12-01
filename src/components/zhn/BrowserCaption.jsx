//import PropTypes from "prop-types";

import { GREEN_COLOR } from '../styles/Color';

import useTheme from '../hooks/useTheme';
import SvgMore from './SvgMore';
import SvgCheckBox from './SvgCheckBox';
import SvgClose from './SvgClose';

const TH_ID = 'ELEMENT';

const CL_BR_CAPTION = 'br-caption text-clip gap-right'
, CL_NOT_SELECTED = 'not-selected';

const S_CAPTION = {
  paddingRight: 8,
  fontSize: '18px',
  fontWeight: '500'
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
  svgMoreStyle,
  children,
  onMore,
  onCheck,
  onUnCheck,
  onClose
}) => {
  const TS = useTheme(TH_ID);
  return (
  <div
    className={CL_BR_CAPTION}
    style={{...style, ...TS.ROOT}}
  >
     {
       _isFn(onMore) &&
       <SvgMore
          style={svgMoreStyle}
          onClick={onMore}
       />
     }
     {
        (_isFn(onCheck) && _isFn(onUnCheck)) &&
        <SvgCheckBox
           style={S_CHECK_BOX}
           color={GREEN_COLOR}
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
