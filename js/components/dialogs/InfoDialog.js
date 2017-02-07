'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = _DialogStyles2.default;

var Styles = {
  CAPTION: {
    width: '400px',
    paddingLeft: '10px',
    color: 'rgba(164, 135, 212,1)',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 2
  },
  DESCR: {
    color: 'gray',
    width: '400px',
    paddingLeft: '10px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre'
  }
};

var InfoDialog = function (_Component) {
  _inherits(InfoDialog, _Component);

  function InfoDialog(props) {
    _classCallCheck(this, InfoDialog);

    return _possibleConstructorReturn(this, (InfoDialog.__proto__ || Object.getPrototypeOf(InfoDialog)).call(this));
  }

  _createClass(InfoDialog, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          onClose = _props.onClose,
          caption = data.caption,
          descr = data.descr;

      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Information',
          isShow: isShow,
          onClose: onClose
        },
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '1' },
          _react2.default.createElement(
            'p',
            { style: Styles.CAPTION },
            caption
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.rowDiv, key: '2' },
          _react2.default.createElement(
            'p',
            { style: Styles.DESCR },
            descr
          )
        )
      );
    }
  }]);

  return InfoDialog;
}(_react.Component);

InfoDialog.displayName = 'InfoDialog';

exports.default = InfoDialog;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\InfoDialog.js.map