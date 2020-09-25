"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

/*eslint-disable react-hooks/exhaustive-deps */
var useListen = function useListen(store, onStore, propNameListen) {
  if (propNameListen === void 0) {
    propNameListen = 'listen';
  }

  (0, _react.useEffect)(function () {
    var unsubscribe = store[propNameListen](onStore);
    return unsubscribe;
  }, []);
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useListen;
exports["default"] = _default;
//# sourceMappingURL=useListen.js.map