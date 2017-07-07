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

var _DraggableDialog = require('../zhn-moleculs/DraggableDialog');

var _DraggableDialog2 = _interopRequireDefault(_DraggableDialog);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _SelectWithLoad = require('../dialogs/SelectWithLoad');

var _SelectWithLoad2 = _interopRequireDefault(_SelectWithLoad);

var _SelectParentChild = require('../dialogs/SelectParentChild');

var _SelectParentChild2 = _interopRequireDefault(_SelectParentChild);

var _RowPattern = require('../dialogs/RowPattern');

var _RowPattern2 = _interopRequireDefault(_RowPattern);

var _Button = require('../dialogs/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DatesFragment = require('../zhn-moleculs/DatesFragment');

var _DatesFragment2 = _interopRequireDefault(_DatesFragment);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _withToolbar = require('../dialogs/decorators/withToolbar');

var _withToolbar2 = _interopRequireDefault(_withToolbar);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  TIP: {
    margin: '10px',
    marginTop: '16px',
    fontWeight: 'bold'
  }
};

var _loadFn = function _loadFn(props, options) {
  var fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      zipCode = options.zipCode,
      _isKeyFeature = two.value === 'Z' ? true : false,
      _three = two.value !== 'Z' ? three : { value: zipCode, caption: zipCode },
      _value = typeof fnValue === 'function' ? fnValue(one.value, two.value, _three.value) : undefined;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: two.caption + ' : ' + _three.caption,
    subtitle: one.caption,
    dataSource: dataSource,
    isKeyFeature: _isKeyFeature
  };
};

var _reZipCode = /^\d{5}$/;
var _isZipCode = function _isZipCode(value) {
  return _reZipCode.test(value);
};

var DialogType5 = (0, _withToolbar2.default)(_class = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(DialogType5, _Component);

  function DialogType5(props) {
    (0, _classCallCheck3.default)(this, DialogType5);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogType5.__proto__ || Object.getPrototypeOf(DialogType5)).call(this));

    _this._handleSelectOne = function (one) {
      _this.one = one;
    };

    _this._handleSelectType = function (type) {
      if (type && type.value === 'Z') {
        _this.setState({ isShowPattern: true });
      } else {
        _this.setState({ isShowPattern: false });
      }
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

      var _this$parentChild$get = _this.parentChild.getValues(),
          parent = _this$parentChild$get.parent;

      if (parent && parent.value === 'Z') {
        if (!_this.inputZipCode.isValid()) {
          msg = msg.concat('Zip Code is not valid');
        }
      } else {
        var _this$parentChild$get2 = _this.parentChild.getValidation(),
            isValid1 = _this$parentChild$get2.isValid,
            msg1 = _this$parentChild$get2.msg;

        if (!isValid1) {
          msg = msg.concat(msg1);
        }
      }

      var _this$datesFragment$g = _this.datesFragment.getValidation(),
          isValid = _this$datesFragment$g.isValid,
          datesMsg = _this$datesFragment$g.datesMsg;

      if (!isValid) {
        msg = msg.concat(datesMsg);
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._createLoadOption = function () {
      var _this$parentChild$get3 = _this.parentChild.getValues(),
          two = _this$parentChild$get3.parent,
          three = _this$parentChild$get3.child,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          zipCode = _this.inputZipCode.getValue();

      return _loadFn(_this.props, { one: _this.one, two: two, three: three, fromDate: fromDate, toDate: toDate, zipCode: zipCode });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose(_this._createValidationMessages);
      _this.props.onClose();
    };

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isShowDate: true,
      isShowPattern: false,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogType5, [{
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
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          nForecastDate = _props.nForecastDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isShowDate = _state.isShowDate,
          isShowPattern = _state.isShowPattern,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _DraggableDialog2.default,
        {
          caption: caption,
          isShow: isShow,
          commandButtons: this._commandButtons,
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
          msgOnNotSelected: msgOnNotSelected,
          onSelectParent: this._handleSelectType
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowPattern },
          _react2.default.createElement(_RowPattern2.default, {
            ref: function ref(n) {
              return _this2.inputZipCode = n;
            },
            title: 'Zip Code*',
            placeholder: 'Zip Code, 5 Digit',
            onTest: _isZipCode,
            errorMsg: '5 digit format must be'
          })
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowDate },
          _react2.default.createElement(_DatesFragment2.default, {
            ref: function ref(c) {
              return _this2.datesFragment = c;
            },
            initFromDate: initFromDate,
            initToDate: initToDate,
            nForecastDate: nForecastDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isShowPattern },
          _react2.default.createElement(
            'div',
            { style: S.TIP },
            '* Not for all Zip Code data are available.'
          )
        ),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return DialogType5;
}(_react.Component)) || _class) || _class;

exports.default = DialogType5;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\ZillowDialog.js.map