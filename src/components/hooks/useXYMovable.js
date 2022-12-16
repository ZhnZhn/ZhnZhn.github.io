import {
  useEffect,
  getRefValue,
  getClientX,
  getClientY
} from '../uiApi';

import { HAS_TOUCH_EVENTS } from '../has';

const _assign = Object.assign
, _isArr = Array.isArray
, _isFn = fn => typeof fn === 'function'
, [
  INIT_EVENT,
  MOVE_EVENT,
  CANCEL_EVENT,
  RESET_EVENT
] = HAS_TOUCH_EVENTS
? ['touchstart','touchmove','touchcancel','touchend']
: ['mousedown','mousemove','mouseleave','mouseup'];

const EVENT_OPTIONS = { passive: true }
, MOVE_EVENT_OPTIONS = { passive: false };

const _fGetIntStyleProperty = (
  propName
) => (style) => parseInt(style[propName], 10)
, _getIntStyleTop = _fGetIntStyleProperty('top')
, _getIntStyleLeft = _fGetIntStyleProperty('left');

const VALUE_GAP = 8;
const _crNextValue = (
  value,
  maxValue
) => value > 0
  ? value > maxValue
    ? maxValue - 2*VALUE_GAP
    : value
  : VALUE_GAP;

const START_EVENT_GAP = 22
const _isValueInGapRange = (
  from,
  to,
  value
) => value - from > START_EVENT_GAP
  && to - value > START_EVENT_GAP;
const _getComposedPath = (
  evt
) => _isFn(evt.composedPath)
  ? evt.composedPath()
  : void 0;

const _isInitEvent = (
  evt,
  initialEvtClientX,
  initialEvtClientY,
  element
) => {
  const _composedPath = _getComposedPath(evt);
  if (_isArr(_composedPath)) {
    for(let i=0; i<_composedPath.length; i++){
      const _el = _composedPath[i];
      if (_el.tagName === 'BUTTON') {
        return false;
      }
      if (_el === element) {
        break;
      }
    }
  }

  if (!HAS_TOUCH_EVENTS) { return true; }

  const {
    left,
    top,
    right,
    bottom
  } = element.getClientRects()[0];
  return _isValueInGapRange(left, right, initialEvtClientX)
    && _isValueInGapRange(top, bottom, initialEvtClientY);
}

const useXYMovable = (
  refElement
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let _element = getRefValue(refElement)
    , _elementStyle = _element.style
    , _diffX = 0
    , _diffY = 0
    , _initialEvtClientX
    , _initialEvtClientY;

    function _moveDone () {
      const _prevTop = _getIntStyleTop(_elementStyle)
      , _prevLeft = _getIntStyleLeft(_elementStyle)
      , _nextLeft = _crNextValue(
          _prevLeft + _diffX,
          window.innerWidth - _element.clientWidth
        )
      , _nextTop = _crNextValue(
          _prevTop + _diffY,
          window.innerHeight - _element.clientHeight
        );

      _assign(_elementStyle, {
        top: `${_nextTop}px`,
        left: `${_nextLeft}px`,
        webkitTransform: '',
        transform: ''
      })

      _diffX = 0
      _diffY = 0
    }

    function _hMove(evt) {
      if (evt.cancelable) {
        evt.stopPropagation()
        evt.preventDefault()
      }

      if (_diffX === 0 && _diffY === 0) {
        _elementStyle.cursor = 'move'
      }

      _diffX = getClientX(evt) - _initialEvtClientX
      _diffY = getClientY(evt) - _initialEvtClientY
      const _translate = `translate(${_diffX}px,${_diffY}px)`
      _assign(_elementStyle, {
        webkitTransform: _translate,
        transform: _translate
      })
    }

    /*eslint-disable no-use-before-define*/
    function _hResetEvent() {
      clearEventListener()
      _moveDone()
    }
    /*eslint-enable no-use-before-define*/

    function _hInitEvent(evt) {
      _initialEvtClientX = getClientX(evt)
      _initialEvtClientY = getClientY(evt)
      if (_isInitEvent(evt, _initialEvtClientX, _initialEvtClientY, _element)) {
        _element.addEventListener(MOVE_EVENT, _hMove, MOVE_EVENT_OPTIONS)
        _element.addEventListener(CANCEL_EVENT, _hResetEvent, EVENT_OPTIONS)
        _element.addEventListener(RESET_EVENT, _hResetEvent, EVENT_OPTIONS)
      }
    }

    function clearEventListener() {
      _elementStyle.cursor = ''
      _element.removeEventListener(MOVE_EVENT, _hMove, MOVE_EVENT_OPTIONS)
      _element.removeEventListener(CANCEL_EVENT, _hResetEvent, EVENT_OPTIONS)
      _element.removeEventListener(RESET_EVENT, _hResetEvent, EVENT_OPTIONS)
    }

    _element.addEventListener(INIT_EVENT, _hInitEvent, EVENT_OPTIONS)

    return () => {
      clearEventListener()
      _element.removeEventListener(INIT_EVENT, _hInitEvent, EVENT_OPTIONS)
      _elementStyle = null;
      _element = null;
    };
  }, [])
  //refElement
  /*eslint-enable react-hooks/exhaustive-deps */
}

export default useXYMovable
