"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Type = require("../../constants/Type");

const _isFn = fn => typeof fn === 'function';

const _crNoop = () => {};

const _crEmptyDescr = () => '';

const _getId = _ref => {
  let {
    _itemKey
  } = _ref;
  return _itemKey;
};

const _crToken = (json, fnOrPropName) => _isFn(fnOrPropName) ? fnOrPropName(json) : json[fnOrPropName];

const _crTokens = (CONFIGS, json) => CONFIGS.map(config => _crToken(json, config)).filter(Boolean);

const TemplateTokens = function (impl) {
  if (!(this instanceof TemplateTokens)) {
    return new TemplateTokens(impl);
  }

  this.impl = {
    getId: _getId,
    crTokensName: _crNoop,
    crDescr: _crEmptyDescr,
    crDescrName: _crNoop,
    crDescrStyle: _crNoop,
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
        zhCompType: _Type.CIT_INFO_ITEM,
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
exports.default = _default;
//# sourceMappingURL=TemplateTokens.js.map