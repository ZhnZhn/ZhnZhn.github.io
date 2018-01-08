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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    display: 'inline-block'
  },
  BT_D: {
    color: '#c0c0c0'
  },
  BT_CL: {
    color: '#f44336'
  }
};

var _isIn = function _isIn(arr, type) {
  var len = arr.length;
  var i = 0;
  for (; i < len; i++) {
    if (arr[i].type === type) {
      return true;
    }
  }
  return false;
};

var HotBar = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(HotBar, _Component);

  function HotBar(props) {
    (0, _classCallCheck3.default)(this, HotBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HotBar.__proto__ || Object.getPrototypeOf(HotBar)).call(this));

    _this._onStore = function (actionType, option) {
      var closeDialogAction = _this.props.closeDialogAction;

      if (actionType === closeDialogAction) {
        _this.setState(function (prevState) {
          var hotButtons = prevState.hotButtons,
              countButtons = prevState.countButtons;

          if (!_isIn(hotButtons, option.type)) {
            hotButtons[countButtons % _this._maxButtons] = option;
            prevState.countButtons += 1;
          }
          return prevState;
        });
      }
    };

    _this._hClean = function () {
      _this.setState({ countButtons: 0, hotButtons: [] });
    };

    _this._renderHotButtons = function (hotButtons, onShowDialog) {
      return hotButtons.map(function (conf, index) {
        var type = conf.type,
            _conf$caption = conf.caption,
            caption = _conf$caption === undefined ? '' : _conf$caption,
            _accessKey = (index + 1).toString(),
            _shortCaption = _accessKey + caption.substr(0, 3);

        return _react2.default.createElement(_FlatButton2.default, {
          key: type,
          rootStyle: S.BT_D,
          caption: _shortCaption,
          title: caption,
          accessKey: _accessKey,
          onClick: onShowDialog.bind(null, type)
        });
      });
    };

    _this._btCleanEl = _react2.default.createElement(_FlatButton2.default, {
      key: 'BT_CLEAN',
      rootStyle: S.BT_CL,
      caption: 'CL',
      title: 'Clean Hot Bar',
      onClick: _this._hClean
    });
    _this._maxButtons = _this._calcMaxButtons(props);
    _this.state = {
      countButtons: 0,
      hotButtons: []
    };
    return _this;
  }

  (0, _createClass3.default)(HotBar, [{
    key: '_calcMaxButtons',
    value: function _calcMaxButtons(props) {
      var strWidth = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
      switch (strWidth) {
        case '"W600"':
          return 3;
        case '"W500"':
          return 2;
        default:
          return props.maxButtons;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.props.store;

      this.unsubscribe = store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var onShowDialog = this.props.onShowDialog,
          hotButtons = this.state.hotButtons,
          _cleanBtEl = hotButtons.length !== 0 ? this._btCleanEl : null;

      return _react2.default.createElement(
        'div',
        { style: S.ROOT },
        this._renderHotButtons(hotButtons, onShowDialog),
        _cleanBtEl
      );
    }
  }]);
  return HotBar;
}(_react.Component), _class.defaultProps = {
  maxButtons: 5
}, _temp);
exports.default = HotBar;
//# sourceMappingURL=HotBar.js.map