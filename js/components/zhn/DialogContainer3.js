'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var S = {
  ROOT: {
    zIndex: 1030,
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: '99%'
  }
};

var getObjToFirst = function getObjToFirst(arr, keyValue) {
  var index = void 0;
  for (var i = 0, max = arr.length; i < max; i++) {
    if (arr[i].key === keyValue) {
      index = i;
      break;
    }
  }
  return [].concat(_toConsumableArray(arr.slice(0, index)), _toConsumableArray(arr.slice(index + 1)), [arr[index]]);
};

var DialogContainer3 = function (_Component) {
  _inherits(DialogContainer3, _Component);

  function DialogContainer3(props) {
    _classCallCheck(this, DialogContainer3);

    var _this = _possibleConstructorReturn(this, (DialogContainer3.__proto__ || Object.getPrototypeOf(DialogContainer3)).call(this));

    _this._checkActiveDialogs = function (dialogType) {
      _this._activeDialogs.push(dialogType);
      if (_this._activeDialogs.length > _this.props.maxDialog) {
        _this.state.dialog[_this._activeDialogs[0]] = false;
        _this._activeDialogs = _this._activeDialogs.slice(1);
      }
    };

    _this.filterActiveDialogs = function (dialogType) {
      _this._activeDialogs = _this._activeDialogs.filter(function (value) {
        return value !== dialogType;
      });
    };

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          initAction = _this$props.initAction,
          showAction = _this$props.showAction;

      if (actionType === showAction) {
        if (!_this.state.dialog[data]) {
          _this.state.dialog[data] = true;
          _this._checkActiveDialogs(data);
        }
        _this.state.compDialogs = getObjToFirst(_this.state.compDialogs, data);
        _this.setState(_this.state);
      } else if (actionType === initAction) {
        _this.state.dialog[data.dialogType] = true;
        _this.state.compDialogs.push(data.dialogComp);
        _this._checkActiveDialogs(data.dialogType);
        _this.setState(_this.state);
      }
    };

    _this._handlerToggleDialog = function (dialogType) {
      var dialog = _this.state.dialog;

      dialog[dialogType] = !dialog[dialogType];
      _this.setState(_this.state);

      if (!dialog[dialogType]) {
        _this.filterActiveDialogs(dialogType);
        document.getElementsByTagName('html')[0].style.cursor = '';
      }
    };

    _this._renderDialogs = function () {
      var _this$state = _this.state,
          dialog = _this$state.dialog,
          compDialogs = _this$state.compDialogs;

      return compDialogs.map(function (compDialog, index) {
        return _react2.default.cloneElement(compDialog, {
          key: compDialog.key,
          isShow: dialog[compDialog.key],
          onClose: _this._handlerToggleDialog.bind(_this, compDialog.key)
        });
      });
    };

    _this._activeDialogs = [];
    _this.state = {
      dialog: {},
      compDialogs: []
    };
    return _this;
  }

  _createClass(DialogContainer3, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        this._renderDialogs()
      );
    }
  }]);

  return DialogContainer3;
}(_react.Component);

exports.default = DialogContainer3;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\DialogContainer3.js.map