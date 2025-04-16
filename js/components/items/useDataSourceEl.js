"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_DATA_SOURCE = {
  ...(0, _styleFn.crAbsoluteTopLeftStyle)(0, 5, !1, !0),
  color: '#909090',
  fontSize: '11px'
};
const DataSource = _ref => {
  let {
    ds
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_DATA_SOURCE,
    children: ds || ''
  });
};
const useDataSourceEl = dataSource => {
  const [dataSourceEl, setDataSourceEl] = (0, _uiApi.useState)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(DataSource, {
      ds: dataSource
    })),
    _setDataSourceEl = (0, _uiApi.useCallback)(dataSource => {
      setDataSourceEl(/*#__PURE__*/(0, _jsxRuntime.jsx)(DataSource, {
        ds: dataSource
      }));
    }, []);
  return [dataSourceEl, _setDataSourceEl];
};
var _default = exports.default = useDataSourceEl;
//# sourceMappingURL=useDataSourceEl.js.map