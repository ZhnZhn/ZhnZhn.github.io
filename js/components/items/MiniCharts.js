"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _HighchartWrapper = _interopRequireDefault(require("../zhn/HighchartWrapper"));
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  _isNotEmptyArr = arr => _isArr(arr) && arr.length > 0;
const MiniCharts = _ref => {
  let {
    withoutAnimation,
    configs,
    idPropName = 'id',
    absComp,
    onLoaded,
    onWillUnLoaded
  } = _ref;
  return _isNotEmptyArr(configs) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: configs.map(c => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      isShow: true,
      withoutAnimation: withoutAnimation,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HighchartWrapper.default, {
        config: c.config,
        absComp: absComp,
        onLoaded: onLoaded,
        onWillUnLoaded: onWillUnLoaded
      })
    }, c[idPropName]))
  }) : null;
};

/*
MiniCharts.propTypes = {
  withoutAnimation: PropTypes.bool,
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      config: PropTypes.object
  })),
  idPropName: PropTypes.string,
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/
var _default = MiniCharts;
exports.default = _default;
//# sourceMappingURL=MiniCharts.js.map