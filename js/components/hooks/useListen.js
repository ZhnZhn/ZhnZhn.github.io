"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartStore = _interopRequireDefault(require("../../flux/stores/ChartStore"));

/*eslint-disable react-hooks/exhaustive-deps */
const useListen = function (onStore, propNameListen) {
  if (propNameListen === void 0) {
    propNameListen = 'listen';
  }

  (0, _react.useEffect)(() => {
    const unsubscribe = _ChartStore.default[propNameListen](onStore);

    return unsubscribe;
  }, []);
  return _ChartStore.default;
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useListen;
exports.default = _default;
//# sourceMappingURL=useListen.js.map