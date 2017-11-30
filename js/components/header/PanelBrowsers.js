'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPane = require('../zhn-moleculs/ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROW: 'row__pane-topic',
  ITEM_DF: 'row__pane-topic item__quandl',
  ITEM_WATCH: 'row__pane-topic item__watch',
  ITEM_ABOUT: 'row__pane-topic item__about'
};
var S = {
  SHOW_HIDE: {
    padding: '0px'
  },
  NEW: {
    display: 'inline-block',
    float: 'right',
    color: 'black'
  }
};

var _renderItems = function _renderItems(_ref) {
  var model = _ref.model,
      onClickDynamic = _ref.onClickDynamic,
      onClickQuandl = _ref.onClickQuandl;

  return model.map(function (item) {
    var cn = item.cn,
        id = item.id,
        title = item.title,
        isQuandl = item.isQuandl,
        isNew = item.isNew,
        _className = cn ? CL.ROW + ' ' + cn : CL.ITEM_DF,
        _onClick = isQuandl ? onClickQuandl : onClickDynamic.bind(null, id),
        _el = isNew ? _react2.default.createElement(
      'span',
      { style: S.NEW },
      'New'
    ) : null;

    return _react2.default.createElement(
      'div',
      {
        className: _className,
        onClick: _onClick
      },
      title,
      _el
    );
  });
};

var PanelBrowsers = function PanelBrowsers(_ref2) {
  var className = _ref2.className,
      isShow = _ref2.isShow,
      model = _ref2.model,
      onClose = _ref2.onClose,
      onClickQuandl = _ref2.onClickQuandl,
      onClickDynamic = _ref2.onClickDynamic,
      onClickAbout = _ref2.onClickAbout;
  return _react2.default.createElement(
    _ModalPane2.default,
    {
      isShow: isShow,
      onClose: onClose
    },
    _react2.default.createElement(
      _ShowHide2.default,
      {
        className: className,
        style: S.SHOW_HIDE,
        isShow: isShow
      },
      _renderItems({ model: model, onClickDynamic: onClickDynamic, onClickQuandl: onClickQuandl }),
      _react2.default.createElement(
        'div',
        {
          className: CL.ITEM_ABOUT,
          onClick: onClickAbout
        },
        'About'
      )
    )
  );
};

exports.default = PanelBrowsers;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\PanelBrowsers.js.map