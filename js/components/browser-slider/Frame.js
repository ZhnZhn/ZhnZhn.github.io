'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuTitle = require('./MenuTitle');

var _MenuTitle2 = _interopRequireDefault(_MenuTitle);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _ErrMsg = require('./ErrMsg');

var _ErrMsg2 = _interopRequireDefault(_ErrMsg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Frame = function (_Component) {
  (0, _inherits3.default)(Frame, _Component);

  function Frame(props) {
    (0, _classCallCheck3.default)(this, Frame);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).call(this));

    _this.loadMenu = function (id) {
      var _this$props = _this.props,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === undefined ? {} : _this$props$dfProps,
          loadItems = _this$props.loadItems,
          store = _this$props.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT);

      loadItems(dfProps.rootUrl + '/' + id, proxy).then(function (model) {
        if (Array.isArray(model)) {
          _this.setState({ model: model, errMsg: undefined });
        }
      }).catch(function (err) {
        _this.setState({ errMsg: err.message });
      });
    };

    _this._renderMenu = function () {
      var _this$props2 = _this.props,
          _this$props2$dfProps = _this$props2.dfProps,
          dfProps = _this$props2$dfProps === undefined ? {} : _this$props2$dfProps,
          pageNumber = _this$props2.pageNumber,
          store = _this$props2.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT),
          model = _this.state.model,
          _this$props3 = _this.props,
          onClickNext = _this$props3.onClickNext,
          fOnClickItem = _this$props3.fOnClickItem,
          rootId = _this$props3.id,
          items = model.map(function (item) {
        var text = item.text,
            id = item.id,
            type = item.type,
            _onClick = type === 'l' ? onClickNext.bind(null, rootId + '/' + id, text, pageNumber) : fOnClickItem((0, _extends3.default)({
          id: rootId + '/' + id
        }, dfProps, {
          proxy: proxy
        }));

        return _react2.default.createElement(_MenuItem2.default, {
          key: id,
          item: item,
          onClick: _onClick
        });
      });


      return _react2.default.createElement(
        'div',
        null,
        items
      );
    };

    _this._refFirst = function (n) {
      return _this._firstNode = n;
    };

    _this.focusFirst = function () {
      if (_this._firstNode) {
        _this._firstNode.focus();
      }
    };

    _this.state = {
      model: []
    };
    return _this;
  }

  (0, _createClass3.default)(Frame, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          title = _props.title,
          id = _props.id;

      if (title) {
        this.loadMenu(id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          title = _props2.title,
          rootStyle = _props2.rootStyle,
          pageNumber = _props2.pageNumber,
          onClickPrev = _props2.onClickPrev,
          errMsg = this.state.errMsg;


      return _react2.default.createElement(
        'div',
        {
          //className="with-scroll"
          style: rootStyle
        },
        _react2.default.createElement(_MenuTitle2.default, {
          ref: this._refFirst,
          title: title,
          onClick: onClickPrev.bind(null, pageNumber)
        }),
        this._renderMenu(),
        _react2.default.createElement(_ErrMsg2.default, { errMsg: errMsg })
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props3 = this.props,
          pageNumber = _props3.pageNumber,
          pageCurrent = _props3.pageCurrent;

      if (pageNumber === pageCurrent) {
        setTimeout(this.focusFirst, 1000);
      }
    }
  }]);
  return Frame;
}(_react.Component);

exports.default = Frame;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-slider\Frame.js.map