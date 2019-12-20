"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Type = require("../../constants/Type");

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crEmptyDescr = function _crEmptyDescr() {
  return '';
};

var _getId = function _getId(_ref) {
  var key = _ref.key;
  return key;
};

var _crNoop = function _crNoop() {};

var _crToken = function _crToken(json, fnOrPropName) {
  return _isFn(fnOrPropName) ? fnOrPropName(json) : json[fnOrPropName];
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
  crKey: function crKey(option) {
    option.key = option.value;
    return option.value;
  },
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
        _tokens = CONFIGS.map(function (config) {
      return _crToken(json, config);
    }).filter(Boolean);

    return {
      zhCompType: _Type.CompItemType.FLEX_TOKENS,
      id: _id,
      caption: crCaption(json, option),
      tokens: _tokens,
      tokensName: crTokensName(json),
      descr: crDescr(json),
      descrName: crDescrName(),
      descrStyle: crDescrStyle(),
      zhConfig: {
        key: _id,
        id: _id
      }
    };
  }
});
var _default = TemplateTokens;
exports["default"] = _default;
//# sourceMappingURL=TemplateTokens.js.map