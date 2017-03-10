'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eurostat = require('../../flux/creaters/eurostat3');

var _eurostat2 = _interopRequireDefault(_eurostat);

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('./ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('./SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _SelectParentChild = require('./SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _withToolbar = require('./decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _withValidationLoad = require('./decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogEurostat3 = (0, _withToolbar2.default)(_class = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(DialogEurostat3, _Component);

  function DialogEurostat3(props) {
    (0, _classCallCheck3.default)(this, DialogEurostat3);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogEurostat3.__proto__ || Object.getPrototypeOf(DialogEurostat3)).call(this));

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleLoad = function () {
      _this._handleWithValidationLoad(_this._createValidationMessages(), _this._createLoadOption);
    };

    _this._createValidationMessages = function () {
      var oneCaption = _this.props.oneCaption;

      var msg = [];

      if (!_this.one) {
        msg.push(_this.props.msgOnNotSelected(oneCaption));
      }

      var _this$parentChild$get = _this.parentChild.getValidation(),
          isValid1 = _this$parentChild$get.isValid,
          msg1 = _this$parentChild$get.msg;

      if (!isValid1) {
        msg = msg.concat(msg1);
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$parentChild$get2 = _this.parentChild.getValues(),
          group = _this$parentChild$get2.parent,
          metric = _this$parentChild$get2.child;

      return (0, _eurostat2.default)(_this.props, { one: _this.one, group: group, metric: metric });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this.one = undefined;
    _this.toolbarButtons = [{ caption: 'I', onClick: _this._clickInfoWithToolbar.bind(_this) }];
    _this.state = {
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogEurostat3, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps) {
        if (this.props.isShow === nextProps.isShow) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          caption = _props.caption,
          isShow = _props.isShow,
          onShow = _props.onShow,
          oneCaption = _props.oneCaption,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          twoCaption = _props.twoCaption,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          threeCaption = _props.threeCaption,
          msgOnNotSelected = _props.msgOnNotSelected,
          validationMessages = this.state.validationMessages,
          _commandButtons = [_react2.default.createElement(_ActionButton2.default, {
        type: 'TypeC',
        caption: 'Load',
        onClick: this._handleLoad
      })];


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: _commandButtons,
          onShowChart: onShow,
          onClose: this._handleClose
        },
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_SelectWithLoad2.default, {
          isShow: isShow,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_SelectParentChild2.default, {
          ref: function ref(c) {
            return _this2.parentChild = c;
          },
          isShow: isShow,
          uri: twoURI,
          parentCaption: twoCaption,
          parentOptionNames: 'Items',
          parentJsonProp: twoJsonProp,
          childCaption: threeCaption,
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogEurostat3;
}(_react.Component)) || _class) || _class;

process.env.NODE_ENV !== "production" ? DialogEurostat3.propTypes = {
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,

  oneCaption: _react.PropTypes.string,
  oneURI: _react.PropTypes.string,
  oneJsonProp: _react.PropTypes.string,

  twoCaption: _react.PropTypes.string,
  twoURI: _react.PropTypes.string,
  twoJsonProp: _react.PropTypes.string,

  threeCaption: _react.PropTypes.string,
  msgOnNotSelected: _react.PropTypes.func,

  onShow: _react.PropTypes.func
} : void 0;


DialogEurostat3.displayName = 'DialogEurostat3';

exports.default = DialogEurostat3;
//# sourceMappingURL=DialogEurostat3.js.map