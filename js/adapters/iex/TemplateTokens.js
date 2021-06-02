"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Type = require("../../constants/Type");

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crNoop = function _crNoop() {};

var _crEmptyDescr = function _crEmptyDescr() {
  return '';
};

var _getId = function _getId(_ref) {
  var _itemKey = _ref._itemKey;
  return _itemKey;
};

var _crToken = function _crToken(json, fnOrPropName) {
  return _isFn(fnOrPropName) ? fnOrPropName(json) : json[fnOrPropName];
};

var _crTokens = function _crTokens(CONFIGS, json) {
  return CONFIGS.map(function (config) {
    return _crToken(json, config);
  }).filter(Boolean);
};

var TemplateTokens = function TemplateTokens(impl) {
  if (!(this instanceof TemplateTokens)) {
    return new TemplateTokens(impl);
  }

  this.impl = (0, _extends2["default"])({
    getId: _getId,
    crTokensName: _crNoop,
    crDescr: _crEmptyDescr,
    crDescrName: _crNoop,
    crDescrStyle: _crNoop
  }, impl);
};

Object.assign(TemplateTokens.prototype, {
  toConfig: function toConfig(json, option) {
    var _this$impl = this.impl,
        getId = _this$impl.getId,
        crCaption = _this$impl.crCaption,
        crTokensName = _this$impl.crTokensName,
        crDescr = _this$impl.crDescr,
        crDescrName = _this$impl.crDescrName,
        crDescrStyle = _this$impl.crDescrStyle,
        CONFIGS = _this$impl.CONFIGS,
        _id = getId(option),
        _tokens = _crTokens(CONFIGS, json);

    return {
      config: {
        zhCompType: _Type.CompItemType.INFO_ITEM,
        id: _id,
        caption: crCaption(json, option),
        items: [{
          caption: crTokensName(json),
          tokens: _tokens
        }, {
          style: crDescrStyle(),
          caption: crDescrName(),
          descr: crDescr(json)
        }],
        zhConfig: {
          key: _id,
          id: _id
        }
      }
    };
  }
});
var _default = TemplateTokens;
exports["default"] = _default;
//# sourceMappingURL=TemplateTokens.js.map