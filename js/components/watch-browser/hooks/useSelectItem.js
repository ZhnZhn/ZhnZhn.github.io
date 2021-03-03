"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var useSelectItem = function useSelectItem() {
  var ref = (0, _react.useRef)(),
      _hSelect = (0, _react.useCallback)(function (item) {
    var _ref = item || {},
        caption = _ref.caption;

    ref.current = caption;
  }, []);

  return [ref, _hSelect];
};

var _default = useSelectItem;
exports["default"] = _default;
//# sourceMappingURL=useSelectItem.js.map