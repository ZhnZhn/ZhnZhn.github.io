"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _TransformFn = _interopRequireDefault(require("./TransformFn"));

var _InputSelect = _interopRequireDefault(require("./InputSelect"));

var WrapperInputSearch = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(WrapperInputSearch, _Component);

  function WrapperInputSearch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleSelectItem = function (item) {
      if (item) {
        _this.props.onSelect(item);
      }
    };

    return _this;
  }

  var _proto = WrapperInputSearch.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        _this$props$placehold = _this$props.placeholder,
        placeholder = _this$props$placehold === void 0 ? '' : _this$props$placehold,
        _this$props$data = _this$props.data,
        data = _this$props$data === void 0 ? {} : _this$props$data,
        ItemOptionComp = _this$props.ItemOptionComp,
        meta = data.meta,
        _meta$caption = meta.caption,
        caption = _meta$caption === void 0 ? {} : _meta$caption,
        _options = _TransformFn["default"].fromLevel3(data);

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: style
    }, /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], {
      width: "100%",
      isShowOptionAnim: true,
      placeholder: placeholder,
      propCaption: caption,
      options: _options,
      ItemOptionComp: ItemOptionComp,
      onSelect: this._handleSelectItem
    }));
  };

  return WrapperInputSearch;
}(_react.Component);

var _default = WrapperInputSearch;
exports["default"] = _default;
//# sourceMappingURL=WrapperInputSearch.js.map