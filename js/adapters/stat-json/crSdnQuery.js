"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _isCategory2 = _interopRequireDefault(require("./isCategory"));

const _crVariable = (code, value) => ({
  code,
  values: [value]
});

const _crVariables = items => items.filter(Boolean).map(({
  slice
}) => {
  const code = Object.keys(slice)[0];
  return _crVariable(code, slice[code]);
});

const _crTimeVariable = (seriaType, time, dfC) => {
  const _isCategory = (0, _isCategory2.default)(seriaType),
        _tidValue = _isCategory ? time : "*",
        _arr = [_crVariable('Tid', _tidValue)];

  if (_isCategory) {
    _arr.push(_crVariable(dfC, "*"));
  }

  return _arr;
};

const crSdnQuery = ({
  dfId,
  items,
  seriaType,
  time,
  dfC
}) => ({
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
});

var _default = crSdnQuery;
exports.default = _default;
//# sourceMappingURL=crSdnQuery.js.map