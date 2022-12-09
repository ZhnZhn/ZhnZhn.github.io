"use strict";

exports.__esModule = true;
exports.default = void 0;
const _isArr = Array.isArray;

const _isEmptyTables = _ref => {
  let {
    tables
  } = _ref;
  return _isArr(tables) && tables.length === 0;
};

const _trJson = (json, id) => {
  const _json = [];
  json.forEach(item => {
    if (item.id !== id) {
      item.text = item.description;

      if (item.hasSubjects || _isEmptyTables(item)) {
        item.type = 'l';
      }

      _json.push(item);
    }
  });
  return _json;
};

const trJsonSdn = (json, id) => {
  const _item = json[0];

  if ((_item.tables || []).length !== 0) {
    return _item.tables.map(a => {
      a.text = a.id + ": " + a.text + ", " + (a.firstPeriod || '') + "-" + (a.latestPeriod || '');
      return a;
    });
  } else if ((_item.subjects || []).length !== 0) {
    return _trJson(_item.subjects, id);
  } else {
    return _trJson(json, id);
  }
};

var _default = trJsonSdn;
exports.default = _default;
//# sourceMappingURL=trJsonSdn.js.map