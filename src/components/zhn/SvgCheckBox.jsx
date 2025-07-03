import { isBool } from '../../utils/isTypeFn';

import {
  useState,
  useMemo,
  useCallback,
  IfTrue
} from '../uiApi';
import {
  S_INLINE,
  crCn
} from '../styleFn';

import { useRefInit } from '../hooks/useProperty';
import { useKeyEnter } from '../hooks/fUseKey';

import {
  FILL_NONE,
  STROKE_LINECAP_ROUND_PROPS,
  Svg100
} from './svg/Svg';

const CL_CHB = 'chb'
, CL_CHB_CHECKED = `${CL_CHB}-checked`
, C_GREY = "#777777";

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
     setUnchecked: () => setValueState(!1)
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
        ? [color || C_GREY, color || FILL_NONE ]
        : [C_GREY, FILL_NONE];

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
        w="18"
        style={S_INLINE}
      >
        <rect
           x="1" y="1"
           height="16" width="16"
           strokeWidth="2" rx="3"
           stroke={_restStroke}
           fill={_restFill}
        />
          <IfTrue v={_value}>
            <path
              className={cnChecked}
              d="M 2,5 L 8,16 M 8,16 L 16,1"
              {...STROKE_LINECAP_ROUND_PROPS}
            />
          </IfTrue>
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
