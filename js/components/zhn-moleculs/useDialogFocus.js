"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _focusNode = _interopRequireDefault(require("../zhn-utils/focusNode"));

const _getRefValue = ref => (ref || {}).current;

const useDialogFocus = (ref, isShow) => {
  const refRoot = (0, _react.useRef)(),
        refBtMore = (0, _react.useRef)(),
        _refPrevFocused = (0, _react.useRef)(),
        _refIsShowPrev = (0, _react.useRef)(),
        focus = (0, _react.useCallback)(() => {
    _refPrevFocused.current = document.activeElement;
    (0, _focusNode.default)(_getRefValue(refBtMore) || _getRefValue(refRoot));
  }, []),
        focusPrev = (0, _react.useCallback)(() => {
    (0, _focusNode.default)(_getRefValue(_refPrevFocused));
    _refPrevFocused.current = null;
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    const _isPrevShow = _getRefValue(_refIsShowPrev);

    if (isShow && !_isPrevShow) {
      focus();
    } else if (!isShow && _isPrevShow) {
      focusPrev();
    }

    _refIsShowPrev.current = isShow;
  }, [isShow]); //focus, focusPrev

  (0, _react.useImperativeHandle)(ref, () => ({
    focus,
    focusPrev
  }), []); //focus, focusPrev

  /*eslint-enable react-hooks/exhaustive-deps */

  return [refRoot, refBtMore];
};

var _default = useDialogFocus;
exports.default = _default;
//# sourceMappingURL=useDialogFocus.js.map