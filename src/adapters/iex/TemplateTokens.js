import { CompItemType as CIT } from '../../constants/Type';

const _isFn = fn => typeof fn === 'function';
const _crEmptyDescr = () => '';
const _getId = ({ key }) => key;
const _crNoop = () => {};

const _crToken = (json, fnOrPropName) => _isFn(fnOrPropName)
  ? fnOrPropName(json)
  : json[fnOrPropName];

const TemplateTokens = function(impl) {
  if (!(this instanceof TemplateTokens)) {
    return (new TemplateTokens(impl));
  }
  this.impl = {
    getId: _getId,
    crTokensName: _crNoop,
    crDescr: _crEmptyDescr,
    crDescrName: _crNoop,
    crDescrStyle: _crNoop,
    ...impl
  }
};

Object.assign(TemplateTokens.prototype, {
  crKey(option){
    option.key = option.value
    return option.value;
  },

  toConfig(json, option){
    const {
      getId, crCaption,
      crTokensName,
      crDescr, crDescrName, crDescrStyle,
      CONFIGS
    } = this.impl
    ,  _id = getId(option)
    , _tokens = CONFIGS
        .map(config => _crToken(json, config))
        .filter(Boolean);
    return {
      zhCompType: CIT.FLEX_TOKENS,
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
})

export default TemplateTokens
