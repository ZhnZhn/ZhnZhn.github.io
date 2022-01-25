"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Comp = _interopRequireDefault(require("../Comp"));

var _jsxRuntime = require("react/jsx-runtime");

const _isArr = Array.isArray,
      _isEmptyArr = arr => !_isArr(arr) || !arr.length;

const MiniCharts = _ref => {
  let {
    withoutAnimation,
    configs,
    idPropName = 'id',
    absComp,
    onLoaded,
    onWillUnLoaded
  } = _ref;
  return _isEmptyArr(configs) ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: configs.map(c => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ShowHide, {
      isShow: true,
      withoutAnimation: withoutAnimation,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.HighchartWrapper, {
        config: c.config,
        absComp: absComp,
        onLoaded: onLoaded,
        onWillUnLoaded: onWillUnLoaded
      })
    }, c[idPropName]))
  });
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