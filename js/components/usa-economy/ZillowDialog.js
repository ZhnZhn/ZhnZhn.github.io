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

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _MenuMore = require('../dialogs/MenuMore');

var _MenuMore2 = _interopRequireDefault(_MenuMore);

var _Decorators = require('../dialogs/decorators/Decorators');

var _Decorators2 = _interopRequireDefault(_Decorators);

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

var ZillowDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3.default)(ZillowDialog, _Component);

  function ZillowDialog(props) {
    (0, _classCallCheck3.default)(this, ZillowDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ZillowDialog.__proto__ || Object.getPrototypeOf(ZillowDialog)).call(this));

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
      _this._handleWithValidationClose();
    };

    _this._refItems = function (c) {
      return _this.parentChild = c;
    };

    _this._refZip = function (n) {
      return _this.inputZipCode = n;
    };

    _this._refDates = function (c) {
      return _this.datesFragment = c;
    };

    _this._menuMore = (0, _MenuMore2.default)(_this, {
      toggleToolBar: _this._toggleWithToolbar,
      onAbout: _this._clickInfoWithToolbar
    });

    _this.toolbarButtons = _this._createType2WithToolbar(props);
    _this._commandButtons = [_react2.default.createElement(_DialogCell2.default.Button.Load, { onClick: _this._handleLoad })];
    _this.state = {
      isToolbar: true,
      isShowLabels: true,
      isShowDate: true,
      isShowPattern: false,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(ZillowDialog, [{
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
          initFromDate = _props.initFromDate,
          initToDate = _props.initToDate,
          nForecastDate = _props.nForecastDate,
          msgOnNotValidFormat = _props.msgOnNotValidFormat,
          onTestDate = _props.onTestDate,
          _state = this.state,
          isToolbar = _state.isToolbar,
          isShowLabels = _state.isShowLabels,
          isShowDate = _state.isShowDate,
          isShowPattern = _state.isShowPattern,
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
          ref: this._refItems,
          isShow: isShow,
          isShowLabels: isShowLabels,
          uri: twoURI,
          parentCaption: twoCaption,
          parentOptionNames: 'Items',
          parentJsonProp: twoJsonProp,
          childCaption: threeCaption,
          msgOnNotSelected: msgOnNotSelected,
          onSelectParent: this._handleSelectType
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowPattern },
          _react2.default.createElement(_DialogCell2.default.RowPattern, {
            ref: this._refZip,
            isShowLabels: isShowLabels,
            title: 'Zip Code*',
            placeholder: 'Zip Code, 5 Digit',
            onTest: _isZipCode,
            errorMsg: '5 digit format must be'
          })
        ),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowDate },
          _react2.default.createElement(_DialogCell2.default.DatesFragment, {
            ref: this._refDates,
            isShowLabels: isShowLabels,
            initFromDate: initFromDate,
            initToDate: initToDate,
            nForecastDate: nForecastDate,
            msgOnNotValidFormat: msgOnNotValidFormat,
            onTestDate: onTestDate
          })
        ),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowPattern },
          _react2.default.createElement(
            'div',
            { style: S.TIP },
            '* Not for all Zip Code data are available.'
          )
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return ZillowDialog;
}(_react.Component)) || _class) || _class);
exports.default = ZillowDialog;
//# sourceMappingURL=ZillowDialog.js.map