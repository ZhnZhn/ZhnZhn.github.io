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

var _dec, _dec2, _dec3, _class;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogEurostat3 = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = _dec3(_class = function (_Component) {
  (0, _inherits3.default)(DialogEurostat3, _Component);

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,
      oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,
      twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,
      threeCaption: PropTypes.string,
    msgOnNotSelected: PropTypes.func,
      onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */

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

      return _this.props.loadFn(_this.props, { one: _this.one, group: group, metric: metric });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this.one = undefined;

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props, { noDate: true });
    _this._commandButtons = _this._crCommandsWithLoad(_this);

    _this.state = {
      isToolbar: true,
      isShowLabels: true,
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
          onFront = _props.onFront,
          oneCaption = _props.oneCaption,
          oneURI = _props.oneURI,
          oneJsonProp = _props.oneJsonProp,
          twoCaption = _props.twoCaption,
          twoURI = _props.twoURI,
          twoJsonProp = _props.twoJsonProp,
          threeCaption = _props.threeCaption,
          msgOnNotSelected = _props.msgOnNotSelected,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DialogCell2.default.DraggableDialog,
        {
          isShow: isShow,
          caption: caption,
          menuModel: this._menuMore,
          commandButtons: this._commandButtons,
          onShowChart: onShow,
          onFront: onFront,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.Toolbar, {
          isShow: isToolbar,
          buttons: this.toolbarButtons
        }),
        _react2.default.createElement(_DialogCell2.default.SelectWithLoad, {
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: oneURI,
          jsonProp: oneJsonProp,
          caption: oneCaption,
          optionNames: 'Items',
          onSelect: this._handleSelectOne
        }),
        _react2.default.createElement(_DialogCell2.default.SelectParentChild, {
          ref: function ref(c) {
            return _this2.parentChild = c;
          },
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          parentCaption: twoCaption,
          parentOptionNames: 'Items',
          parentJsonProp: twoJsonProp,
          childCaption: threeCaption,
          msgOnNotSelected: msgOnNotSelected
        }),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogEurostat3;
}(_react.Component)) || _class) || _class) || _class);
exports.default = DialogEurostat3;
//# sourceMappingURL=DialogEurostat3.js.map