"use strict";

exports.__esModule = true;
exports.default = void 0;
const udpdateStateIf = (setState, propName, propValue) => {
  setState(prevState => {
    if (prevState[propName] !== propValue) {
      prevState[propName] = propValue;
      return {
        ...prevState
      };
    }
    return prevState;
  });
};
var _default = udpdateStateIf;
exports.default = _default;
//# sourceMappingURL=updateStateIf.js.map