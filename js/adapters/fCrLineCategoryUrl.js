"use strict";

exports.__esModule = true;
exports.default = void 0;
var _getPropertyFn = require("../utils/getPropertyFn");
const TS_TYPE_21 = 21;
const _crApiUrl = items => (0, _getPropertyFn.getV)(items[1]);
const _crBaApiUrl = items => `${(0, _getPropertyFn.getV)(items[2])}-${(0, _getPropertyFn.getV)(items[1])}`;
const fCrLineCategoryUrl = dataUrl => {
  const _crApiToken = option => {
    const _crToken = option.dfTs === TS_TYPE_21 ? _crBaApiUrl : _crApiUrl;
    return `${dataUrl}/${_crToken(option.items)}`;
  };
  const _crLineUrl = option => {
    const {
        items
      } = option,
      geo = (0, _getPropertyFn.getV)(items[0]);
    return `${_crApiToken(option)}/${geo}.json`;
  };
  const _crCategoryUrl = option => `${_crApiToken(option)}/by-geo-${option.time}.json`;
  return [_crLineUrl, _crCategoryUrl];
};
var _default = exports.default = fCrLineCategoryUrl;
//# sourceMappingURL=fCrLineCategoryUrl.js.map