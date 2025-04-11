import { isBool } from '../../utils/isTypeFn';

import {
  useState,
  useMemo,
  useCallback
} from '../uiApi';
import { crCn } from '../styleFn';

import useRefInit from '../hooks/useRefInit';
import { useKeyEnter } from '../hooks/fUseKey';

import {
  TRANSPARENT_COLOR
} from '../styles/Color';
import Svg100 from './svg/Svg100';

const CL_CHB = 'chb'
, CL_CHB_CHECKED = 'chb-checked'
, S_SVG = { display: 'inline-block' }
, C_GREY = "#777777";

const SvgChecked = ({
  className
}) => (
  <path
      className={className}
      d="M 2,5 L 8,14 14,1"
      strokeWidth="2"
      strokeLinecap="round"
      fill={TRANSPARENT_COLOR}
  />
);

const FN_NOOP = () => {};
const _crAriaLabelledByProp = ({
  labelId,
  ariaLabel
}) => labelId
  ? { "aria-labelledby": labelId }
  : { "aria-label": ariaLabel || "Option" };

const SvgCheckBox = (props) => {
  const {
    initialValue,
    value,
    className,
    style,
    color,
    cnChecked=CL_CHB_CHECKED,
    onCheck=FN_NOOP,
    onUnCheck=FN_NOOP
  } = props
  , [
    valueState,
    setValueState
  ] = useState(
    () => isBool(value)
      ? void 0:
      !!initialValue
  )
  , _isValueState = useRefInit(
      () => isBool(valueState)
    )
  , _value = _isValueState
     ? valueState
     : value
  , _comp = useMemo(() => ({
     setUnchecked: () => setValueState(false)
  }), [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hToggle = useCallback((evt) => {
    evt.preventDefault()
    const _toggle = _value
      ? onUnCheck : onCheck;
    _toggle(_comp)

    if (_isValueState) {
      setValueState(!_value)
    }
  }, [_value, onCheck, onUnCheck])
  //_comp, _isValueState
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyDown = useKeyEnter(_hToggle, [_hToggle])
  , _className = _value
      ? className
      : void 0
  , [
    _restStroke,
    _restFill
  ] = _className
    ? []
    : _value
        ? [color || C_GREY, color || TRANSPARENT_COLOR ]
        : [C_GREY, TRANSPARENT_COLOR];

  return (
    <div
       {..._crAriaLabelledByProp(props)}
       role="checkbox"
       tabIndex="0"
       aria-checked={_value}
       className={crCn(CL_CHB, _className)}
       style={style}
       onClick={_hToggle}
       onKeyDown={_hKeyDown}
    >
      <Svg100
        w="16"
        style={S_SVG}
      >
        <rect
           x="1" y="1"
           height="14" width="14"
           strokeWidth="2" rx="3"
           stroke={_restStroke}
           fill={_restFill}
        />
        { _value
           ? <SvgChecked className={cnChecked} />
           : null
        }
      </Svg100>
    </div>
  );
};

/*
SvgCheckBox.propTypes = {
  initValue: PropTypes.bool,
  value: PropTypes.bool,
  style: PropTypes.object,
  color: PropTypes.string,
  labelId: PropTypes.string,
  ariaLabel: PropTypes.string,
  cnChecked: PropTypes.string,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}
*/

export default SvgCheckBox
