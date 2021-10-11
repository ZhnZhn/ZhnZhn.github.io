"use strict";

exports.__esModule = true;
exports.default = void 0;

/*
{
 code: 'Tid',
 selection: {
   filter: 'all',
   values: ['*']
 }
}
*/
const crQueryItem = (code, filter, value) => ({
  code,
  selection: {
    filter,
    values: [value]
  }
});

var _default = crQueryItem;
exports.default = _default;
//# sourceMappingURL=crQueryItem.js.map