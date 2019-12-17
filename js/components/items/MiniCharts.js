"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _HighchartWrapper = _interopRequireDefault(require("../zhn/HighchartWrapper"));

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
  var configs = _ref.configs,
      idPropName = _ref.idPropName,
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

  return _react["default"].createElement("div", null, _configs.map(function (c) {
    return _react["default"].createElement(_ShowHide["default"], {
      isShow: true,
      key: c[idPropName]
    }, _react["default"].createElement(_HighchartWrapper["default"], {
      isShow: true,
      config: c.config,
      absComp: absComp,
      onLoaded: onLoaded,
      onWillUnLoaded: onWillUnLoaded
    }));
  }));
};

MiniCharts.defaultProps = {
  idPropName: 'id'
};
/*
MiniCharts.propTypes = {
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