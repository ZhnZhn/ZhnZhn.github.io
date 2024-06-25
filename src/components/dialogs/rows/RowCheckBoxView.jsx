import {
  useId,
  useCallback
} from '../../uiApi';
import {
  crCn,
  crStyle2,
  crBold16Cn
} from '../../styleFn';

import Button from '../../zhn/Button';
import SvgCheckBox from '../../zhn/SvgCheckBox';

const CL_BT_CHB = crBold16Cn('bt-chb')
, COLOR = '#1b2836'
, S_ROOT = {
  padding: '6px 0 0 16px'
};

const RowCheckBoxView = ({
  chbCn,
  btCn,
  style,
  value,
  caption,
  captionStyle,
  color=COLOR,
  hCheck,
  hUnCheck
}) => {
  const _captionId = useId()
  , _hToggle = useCallback(() => {
     if (value) {
       hUnCheck()
     } else {
       hCheck()
     }
   }, [value, hCheck, hUnCheck])
  , _btCn = value ? btCn : void 0
  , _captionStyle = crStyle2(
     captionStyle,
     !_btCn && value && { color }
  )
  , _isCaption = !!caption ;

  return (
    <div style={{...S_ROOT, ...style}}>
      <SvgCheckBox
        value={value}
        className={chbCn}
        color={color}
        labelId={_isCaption ? _captionId : void 0}
        onCheck={hCheck}
        onUnCheck={hUnCheck}
      />
      {
        _isCaption && (
          <Button
            id={_captionId}
            tabIndex="-1"
            className={crCn(CL_BT_CHB, _btCn)}
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
