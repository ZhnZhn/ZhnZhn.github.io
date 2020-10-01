"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var numberFormat = _AdapterFn["default"].numberFormat;

var crTableConfig = function crTableConfig(_ref) {
  var id = _ref.id,
      title = _ref.title,
      headers = _ref.headers,
      rows = _ref.rows,
      dataSource = _ref.dataSource,
      _ref$fns = _ref.fns,
      fns = _ref$fns === void 0 ? {} : _ref$fns;
  return {
    id: id,
    title: title,
    headers: headers,
    tableFn: (0, _extends2["default"])({
      numberFormat: numberFormat
    }, fns),
    rows: rows,
    dataSource: dataSource,
    zhCompType: 'TABLE',
    zhConfig: {
      id: id,
      key: id
    }
  };
};

var _default = crTableConfig;
exports["default"] = _default;
//# sourceMappingURL=crTableConfig.js.map