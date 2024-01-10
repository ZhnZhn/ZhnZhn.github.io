"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CompItemType = require("../../constants/CompItemType");
var _AdapterFn = require("../AdapterFn");
const _isFn = fn => typeof fn === 'function';
const _crEmptyDescr = () => '';
const _crToken = (json, fnOrPropName) => _isFn(fnOrPropName) ? fnOrPropName(json) : json[fnOrPropName];
const _crTokens = (CONFIGS, json) => CONFIGS.map(config => _crToken(json, config)).filter(Boolean);
const TemplateTokens = function (impl) {
  if (!(this instanceof TemplateTokens)) {
    return new TemplateTokens(impl);
  }
  this.impl = {
    getId: _AdapterFn.crDfItemKey,
    crTokensName: _AdapterFn.FN_NOOP,
    crDescr: _crEmptyDescr,
    crDescrName: _AdapterFn.FN_NOOP,
    crDescrStyle: _AdapterFn.FN_NOOP,
    ...impl
  };
};
Object.assign(TemplateTokens.prototype, {
  toConfig(json, option) {
    const {
        getId,
        crCaption,
        crTokensName,
        crDescr,
        crDescrName,
        crDescrStyle,
        CONFIGS
      } = this.impl,
      _id = getId(option),
      _tokens = _crTokens(CONFIGS, json);
    return {
      config: {
        zhCompType: _CompItemType.CIT_INFO_ITEM,
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
var _default = exports.default = TemplateTokens;
//# sourceMappingURL=TemplateTokens.js.map