"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _jsxRuntime = require("react/jsx-runtime");

const S_DATA_SOURCE = {
  position: 'absolute',
  left: 5,
  bottom: 0,
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
  const [dataSourceEl, setDataSourceEl] = (0, _react.useState)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(DataSource, {
    ds: dataSource
  })),
        _setDataSourceEl = (0, _react.useCallback)(dataSource => {
    setDataSourceEl( /*#__PURE__*/(0, _jsxRuntime.jsx)(DataSource, {
      ds: dataSource
    }));
  }, []);

  return [dataSourceEl, _setDataSourceEl];
};

var _default = useDataSourceEl;
exports.default = _default;
//# sourceMappingURL=useDataSourceEl.js.map