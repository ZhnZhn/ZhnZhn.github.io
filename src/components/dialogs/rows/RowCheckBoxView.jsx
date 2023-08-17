import { crStyle2 } from '../../styleFn';

import Button from '../../zhn/Button';
import SvgCheckBox from '../../zhn/SvgCheckBox';

import useRowCheckBox from './useRowCheckBox';

const CL_BT_CHB = 'bt-chb'
, COLOR = '#1b2836'
, S_ROOT = {
  padding: '6px 0 0 16px'
}
, crCaptionStyle = (
   captionStyle,
   checkedColor,
   value
) => crStyle2(
   captionStyle,
   value && { color: checkedColor }
);

const RowCheckBoxView = ({
  style,
  value,
  caption,
  captionStyle,
  color=COLOR,
  hCheck,
  hUnCheck
}) => {
  const [
     TS,
     _hToggle
  ] = useRowCheckBox(
     value,
     hCheck,
     hUnCheck
  )
  , _captionStyle = crCaptionStyle(
     captionStyle,
     color,
     value
  );

  return (
    <div style={{...S_ROOT, ...style}}>
      <SvgCheckBox
        value={value}
        color={color}
        checkedColor={TS.CHECKED_COLOR}
        onCheck={hCheck}
        onUnCheck={hUnCheck}
      />
      {
        caption && (
          <Button
            tabIndex="-1"
            className={CL_BT_CHB}
            style={_captionStyle}
            onClick={_hToggle}
          >
            {caption}
          </Button>
        )
      }
    </div>
  );
};

export default RowCheckBoxView
