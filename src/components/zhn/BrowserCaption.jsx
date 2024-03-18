//import PropTypes from "prop-types";
import { isFn, useId } from '../uiApi';
import { crElementCn } from '../styleFn';

import { GREEN_COLOR } from '../styles/Color';

import SvgMore from './SvgMore';
import SvgCheckBox from './SvgCheckBox';
import { BtSvgClose } from './BtSvgX';

const CL_TEXT_CLIP = 'text-clip'
, CL_BR_CAPTION = crElementCn(`br-caption ${CL_TEXT_CLIP} gap-right`)
, CL_CAPTION = `not-selected ${CL_TEXT_CLIP}`

, S_CAPTION = {
  paddingRight: 8,
  fontSize: '18px',
  fontWeight: '500'
},
S_CHECK_BOX = {
  position: 'relative',
  top: -3,
  margin: '0 10px 0 6px'
};

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
  const captionId = useId();
  return (
    <div
      className={CL_BR_CAPTION}
      style={style}
    >
       {
         isFn(onMore) &&
         <SvgMore
            style={svgMoreStyle}
            onClick={onMore}
         />
       }
       {
          isFn(onCheck) && isFn(onUnCheck) &&
          <SvgCheckBox
             style={S_CHECK_BOX}
             color={GREEN_COLOR}
             labelId={captionId}
             onCheck={onCheck}
             onUnCheck={onUnCheck}
          />
       }
       <span
          id={captionId}
          className={CL_CAPTION}
          style={{...S_CAPTION, ...captionStyle}}
       >
         {caption}
      </span>
      {children}
      <BtSvgClose
        onClick={onClose}
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
