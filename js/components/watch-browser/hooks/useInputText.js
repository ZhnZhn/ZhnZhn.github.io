"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var useInputText = function useInputText(setValidationMessages) {
  var ref = (0, _react.useRef)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
      _hClear = (0, _react.useCallback)(function () {
    var current = ref.current;

    if (current) {
      current.setValue('');
      setValidationMessages([]);
    }
  }, []); //setValidationMessages

  /*eslint-enable react-hooks/exhaustive-deps */


  return [ref, _hClear];
};

var _default = useInputText;
exports["default"] = _default;
//# sourceMappingURL=useInputText.js.map