"use strict";

exports.__esModule = true;
exports.default = void 0;
const fCrLineCategoryUrl = dataUrl => {
  const _crApiUrl = items => {
    const metric = items[1].v;
    return `${dataUrl}/${metric}`;
  };
  const _crLineUrl = option => {
    const {
        items
      } = option,
      geo = items[0].v;
    return `${_crApiUrl(items)}/${geo}.json`;
  };
  const _crCategoryUrl = option => `${_crApiUrl(option.items)}/by-geo-${option.time}.json`;
  return [_crLineUrl, _crCategoryUrl];
};
var _default = exports.default = fCrLineCategoryUrl;
//# sourceMappingURL=fCrLineCategoryUrl.js.map