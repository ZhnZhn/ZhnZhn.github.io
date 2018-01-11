'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = "native-link";

var ROOT = 'https://fred.stlouisfed.org/';
var C = {
  URL_SEARCH: ROOT + 'search?st=',
  URL_GRAPH: ROOT + 'series/'
};

var S = {
  DELIMETER: {
    display: 'inline-block',
    width: '32px'
  }
};

var Delimeter = function Delimeter() {
  return _react2.default.createElement(
    'span',
    { style: S.DELIMETER },
    '\xA0'
  );
};

var FredLink = function FredLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === undefined ? {} : _ref$item;
  var _item$id = item.id,
      id = _item$id === undefined ? '' : _item$id,
      article = item.article;

  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(_Link2.default, {
      className: CL,
      caption: 'FRED Search',
      href: C.URL_SEARCH + id
    }),
    _react2.default.createElement(Delimeter, null),
    _react2.default.createElement(_Link2.default, {
      className: CL,
      caption: 'FRED Graph',
      href: C.URL_GRAPH + id
    }),
    _react2.default.createElement(Delimeter, null),
    article && _react2.default.createElement(_Link2.default, {
      className: CL,
      caption: 'FRED Article',
      href: article
    })
  );
};

exports.default = FredLink;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\native-links\FredLink.js.map