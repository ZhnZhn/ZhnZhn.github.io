"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useHasMounted = _interopRequireDefault(require("./useHasMounted"));

const useDidUpdate = (onDidUpdate, deps) => {
  const _hasMounted = (0, _useHasMounted.default)();
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    if (!_hasMounted) {
      onDidUpdate();
    }
  }, deps); // _hasMounted, onDidUpdate

  /*eslint-enable react-hooks/exhaustive-deps */
};

var _default = useDidUpdate;
exports.default = _default;
//# sourceMappingURL=useDidUpdate.js.map