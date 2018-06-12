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

var _fIsBtTitle = function _fIsBtTitle(title) {
  return function (c) {
    return c.btTitle === title;
  };
};

var MiniCharts = function MiniCharts(_ref) {
  var titles = _ref.titles,
      configs = _ref.configs,
      absComp = _ref.absComp,
      onLoaded = _ref.onLoaded,
      onWillUnLoaded = _ref.onWillUnLoaded;

  if (!titles || !titles.length || !configs || !configs.length) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    null,
    titles.map(function (title) {
      var _isBtTitle = _fIsBtTitle(title),
          _c = configs.find(_isBtTitle);
      return _c ? _react2.default.createElement(
        _ShowHide2.default,
        { isShow: true, key: title },
        _react2.default.createElement(_HighchartWrapper2.default, {
          isShow: true,
          config: _c.config,
          absComp: absComp,
          onLoaded: onLoaded,
          onWillUnLoaded: onWillUnLoaded
        })
      ) : null;
    })
  );
};

/*
MiniCharts.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      btTitle: PropTypes.string,
      config: PropTypes.object
  })),
  absComp: PropTypes.node,
  onLoaded: PropTypes.func,
  onWillUnLoaded: PropTypes.func
}
*/

exports.default = MiniCharts;
//# sourceMappingURL=MiniCharts.js.map