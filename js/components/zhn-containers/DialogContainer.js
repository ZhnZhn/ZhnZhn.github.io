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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    zIndex: 1030,
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: '99%'
  }
};

var _doVisible = function _doVisible(arr, keyValue) {
  var index = void 0,
      max = arr.length,
      i = void 0;
  for (i = 0; i < max; i++) {
    if (arr[i].key === keyValue) {
      index = i;
      break;
    }
  }
  return [].concat((0, _toConsumableArray3.default)(arr.slice(0, index)), (0, _toConsumableArray3.default)(arr.slice(index + 1)), [arr[index]]);
};

var _updateVisible = function _updateVisible(state, key, maxDialog) {
  var hmIs = state.hmIs;

  if (!hmIs[key]) {
    var visibleDialogs = state.visibleDialogs;

    hmIs[key] = true;
    visibleDialogs.push(key);
    if (visibleDialogs.length > maxDialog) {
      hmIs[visibleDialogs[0]] = false;
      visibleDialogs = visibleDialogs.slice(1);
    }
  }
};

var DialogContainer = function (_Component) {
  (0, _inherits3.default)(DialogContainer, _Component);

  function DialogContainer(props) {
    (0, _classCallCheck3.default)(this, DialogContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call(this));

    _this._onStore = function (actionType, option) {
      var showAction = _this.props.showAction;

      if (actionType === showAction) {
        _this.setState(function (prevState) {
          var key = option.key,
              Comp = option.Comp,
              data = option.data,
              maxDialog = _this.props.maxDialog;

          _updateVisible(prevState, key, maxDialog);
          if (!Comp) {
            prevState.compDialogs = _doVisible(prevState.compDialogs, key);
          } else {
            prevState.compDialogs.push(Comp);
          }
          prevState.hmData[key] = data;
          return prevState;
        });
      }
    };

    _this._handleToggleDialog = function (key) {
      _this.setState(function (prevState) {
        var hmIs = prevState.hmIs;

        hmIs[key] = !hmIs[key];
        if (!hmIs[key]) {
          prevState.visibleDialogs = prevState.visibleDialogs.filter(function (value) {
            return value !== key;
          });
          _this.elHtml.style.cursor = '';
        }
        return prevState;
      });
    };

    _this._renderDialogs = function () {
      var _this$state = _this.state,
          hmIs = _this$state.hmIs,
          compDialogs = _this$state.compDialogs,
          hmData = _this$state.hmData;

      return compDialogs.map(function (Comp) {
        var key = Comp.key;
        return _react2.default.cloneElement(Comp, {
          key: key,
          isShow: hmIs[key],
          optionData: hmData[key],
          onClose: _this._handleToggleDialog.bind(_this, key)
        });
      });
    };

    _this.elHtml = document.getElementsByTagName('html')[0];
    _this.state = {
      hmIs: {},
      compDialogs: [],
      hmData: {},
      visibleDialogs: []
    };
    return _this;
  }

  (0, _createClass3.default)(DialogContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
  return DialogContainer;
}(_react.Component);

exports.default = DialogContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-containers\DialogContainer.js.map