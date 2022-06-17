"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useToggleState = initialValue => {
  const [toggleState, setToggleState] = (0, _uiApi.useState)(initialValue),
        toggleByPropName = (0, _uiApi.useCallback)(propName => setToggleState(prevState => ({ ...prevState,
    [propName]: !prevState[propName]
  })), []);
  return [toggleState, toggleByPropName];
};

var _default = useToggleState;
exports.default = _default;
//# sourceMappingURL=useToggleState.js.map