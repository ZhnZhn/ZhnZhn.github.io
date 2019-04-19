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

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};
var _isByZipCode = function _isByZipCode(item) {
  return item && item.value === 'Z';
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
      _hasZipCode = _isByZipCode(two),
      _three = !_hasZipCode ? three : { value: zipCode, caption: zipCode },
      _value = _isFn(fnValue) ? fnValue(one.value, two.value, _three.value) : void 0;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: two.caption + ': ' + _three.caption,
    subtitle: one.caption,
    dataSource: dataSource,
    isKeyFeature: _hasZipCode
  };
};

var _reZipCode = /^\d{5}$/;
var _isZipCode = function _isZipCode(value) {
  return _reZipCode.test(value.trim());
};

var ZillowDialog = (_dec = _Decorators2.default.withToolbar, _dec2 = _Decorators2.default.withValidationLoad, _dec3 = _Decorators2.default.withLoad, _dec(_class = _dec2(_class = _dec3(_class = function (_Component) {
  (0, _inherits3.default)(ZillowDialog, _Component);

  function ZillowDialog(props) {
    (0, _classCallCheck3.default)(this, ZillowDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ZillowDialog.__proto__ || Object.getPrototypeOf(ZillowDialog)).call(this, props));

    _this._hSelectMetric = function (metric) {
      _this.metric = metric;
    };

    _this._handleSelectType = function (type) {
      if (_isByZipCode(type)) {
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

      if (!_this.metric) {
        msg.push(_this.props.msgOnNotSelected(oneCaption));
      }

      var _this$inputTypeCode$g = _this.inputTypeCode.getValues(),
          one = _this$inputTypeCode$g.one;

      if (_isByZipCode(one)) {
        if (!_this.inputZipCode.isValid()) {
          msg = msg.concat('Zip Code is not valid');
        }
      } else {
        var _this$inputTypeCode$g2 = _this.inputTypeCode.getValidation(),
            isValid1 = _this$inputTypeCode$g2.isValid,
            msg1 = _this$inputTypeCode$g2.msg;

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
      var _this$inputTypeCode$g3 = _this.inputTypeCode.getValues(),
          two = _this$inputTypeCode$g3.one,
          three = _this$inputTypeCode$g3.two,
          _this$datesFragment$g2 = _this.datesFragment.getValues(),
          fromDate = _this$datesFragment$g2.fromDate,
          toDate = _this$datesFragment$g2.toDate,
          zipCode = _this.inputZipCode.getValue();

      return _loadFn(_this.props, {
        one: _this.metric,
        two: two, three: three,
        fromDate: fromDate, toDate: toDate,
        zipCode: zipCode
      });
    };

    _this._handleClose = function () {
      _this._handleWithValidationClose();
    };

    _this._refTypeCode = function (c) {
      return _this.inputTypeCode = c;
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
    _this._commandButtons = _this._crCommandsWithLoad(_this);

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
          onSelect: this._hSelectMetric
        }),
        _react2.default.createElement(_DialogCell2.default.SelectOneTwo, {
          ref: this._refTypeCode,
          isShow: isShow,
          isShowLabels: isShowLabels,
          isHideTwo: isShowPattern,
          uri: twoURI,
          oneCaption: twoCaption,
          oneJsonProp: twoJsonProp,
          twoCaption: threeCaption,
          msgOnNotSelected: msgOnNotSelected,
          onSelectOne: this._handleSelectType
        }),
        _react2.default.createElement(
          _DialogCell2.default.ShowHide,
          { isShow: isShowPattern },
          _react2.default.createElement(_DialogCell2.default.RowPattern, {
            ref: this._refZip,
            isShowLabels: isShowLabels,
            caption: '*Zip Code',
            placeholder: 'Zip Code, 5 Digits',
            onTest: _isZipCode,
            errorMsg: '5 digits format is required'
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
            '*Not for all Zip Codes data is available'
          )
        ),
        _react2.default.createElement(_DialogCell2.default.ValidationMessages, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return ZillowDialog;
}(_react.Component)) || _class) || _class) || _class);
exports.default = ZillowDialog;
//# sourceMappingURL=ZillowDialog.js.map