"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _crIsId = _interopRequireDefault(require("./crIsId"));

const useRowTogle = configs => {
  const [isRow, setIsRow] = (0, _react.useState)({
    isShowChart: true,
    isShowDate: false
  }),
        _toggleIsRow = (0, _react.useCallback)(propName => {
    setIsRow(is => {
      is[propName] = !is[propName];
      return { ...is
      };
    });
  }, []);

  (0, _react.useEffect)(() => {
    const _dfIs = {};
    let _isDfItem = false;
    configs.forEach(config => {
      if (config.dfItem) {
        _isDfItem = true;
        _dfIs[(0, _crIsId.default)(config.id)] = true;
      }
    });
    setIsRow(is => _isDfItem ? { ...is,
      ..._dfIs
    } : is);
  }, [configs]);
  return [isRow, setIsRow, _toggleIsRow];
};

var _default = useRowTogle;
exports.default = _default;
//# sourceMappingURL=useRowToggle.js.map