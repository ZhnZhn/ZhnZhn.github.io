"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Comp = _interopRequireDefault(require("../Comp"));

var _fIsTitle = function _fIsTitle(title, idPropName) {
  return function (c) {
    return c[idPropName] === title;
  };
};

var _arrangeBy = function _arrangeBy(titles, configs, idPropName) {
  var _configs = [];

  if (!titles || !titles.length) {
    return _configs;
  }

  titles.forEach(function (title) {
    var _isTitle = _fIsTitle(title, idPropName),
        _c = configs.find(_isTitle);

    if (_c) {
      _configs.push(_c);
    }
  });
  return _configs;
};

var MiniCharts = function MiniCharts(_ref) {
  var withoutAnimation = _ref.withoutAnimation,
      configs = _ref.configs,
      _ref$idPropName = _ref.idPropName,
      idPropName = _ref$idPropName === void 0 ? 'id' : _ref$idPropName,
      ids = _ref.ids,
      absComp = _ref.absComp,
      onLoaded = _ref.onLoaded,
      onWillUnLoaded = _ref.onWillUnLoaded;

  if (!configs || !configs.length) {
    return null;
  }

  var _configs = Array.isArray(ids) ? _arrangeBy(ids, configs, idPropName) : configs;

  if (_configs.length === 0) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: _configs.map(function (c) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ShowHide, {
        isShow: true,
        withoutAnimation: withoutAnimation,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].HighchartWrapper, {
          config: c.config,
          absComp: absComp,
          onLoaded: onLoaded,
          onWillUnLoaded: onWillUnLoaded
        })
      }, c[idPropName]);
    })
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
  ids: PropTypes.arrayOf(PropTypes.string),
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/


var _default = MiniCharts;
exports["default"] = _default;
//# sourceMappingURL=MiniCharts.js.map