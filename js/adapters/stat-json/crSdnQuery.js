"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _CategoryFn = require("../CategoryFn");
const _crVariable = (code, value) => ({
  code,
  values: [value]
});
const _crVariables = items => items.filter(Boolean).map(_ref => {
  let {
    slice
  } = _ref;
  const code = (0, _isTypeFn.getObjectKeys)(slice)[0];
  return _crVariable(code, slice[code]);
});
const _crTimeVariable = (seriaType, time, dfC) => {
  const _isCategory = (0, _CategoryFn.isCategory)(seriaType),
    _tidValue = _isCategory ? time : "*",
    _arr = [_crVariable("Tid", _tidValue)];
  if (_isCategory) {
    _arr.push(_crVariable(dfC, "*"));
  }
  return _arr;
};
const crSdnQuery = _ref2 => {
  let {
    dfId,
    items,
    seriaType,
    time,
    dfC
  } = _ref2;
  return {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      lang: "en",
      table: dfId,
      format: "JSONSTAT",
      valuePresentation: "Default",
      timeOrder: "Ascending",
      variables: [..._crVariables(items), ..._crTimeVariable(seriaType, time, dfC)]
    })
  };
};
var _default = exports.default = crSdnQuery;
//# sourceMappingURL=crSdnQuery.js.map