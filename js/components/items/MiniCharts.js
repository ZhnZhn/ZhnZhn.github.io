'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _HighchartWrapper = require('../zhn/HighchartWrapper');

var _HighchartWrapper2 = _interopRequireDefault(_HighchartWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return _react2.default.createElement(
    'div',
    null,
    _configs.map(function (c) {
      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: true, key: c[idPropName] },
        _react2.default.createElement(_HighchartWrapper2.default, {
          isShow: true,
          config: c.config,
          absComp: absComp,
          onLoaded: onLoaded,
          onWillUnLoaded: onWillUnLoaded
        })
      );
    })
  );
};

MiniCharts.defaultProps = {
  idPropName: 'id'

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

};exports.default = MiniCharts;
//# sourceMappingURL=MiniCharts.js.map