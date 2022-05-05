"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

const FRED = 'FRED';

const _crId = option => {
  const {
    value,
    two,
    three = ''
  } = option;
  return two ? value + "_" + two + "_" + three : value;
};

const _crLinkItem = option => {
  const {
    linkFn,
    value = ''
  } = option;

  if (linkFn === FRED) {
    return {
      id: value.replace('$', ''),
      article: option.dfArticle
    };
  }

  return value;
};

const _crZhConfig = option => {
  const {
    title = '',
    dataSource,
    linkFn
  } = option,
        item = _crLinkItem(option),
        id = _crId(option);

  return {
    id: id,
    key: id,
    itemCaption: title,
    linkFn,
    item,
    dataSource
  };
};

const _crInfo = _ref => {
  let {
    title = ''
  } = _ref;
  return {
    name: title
  };
};

const fnAdapter = {
  crSubtitle: _ref2 => {
    let {
      subtitle = '',
      threeCaption
    } = _ref2;
    return threeCaption ? subtitle + ", " + threeCaption : subtitle;
  },
  crData: json => {
    const d = [];
    json.data.forEach(p => {
      const {
        date,
        value
      } = p;

      if ((0, _AdapterFn.isNumberOrNull)(value)) {
        d.push({
          x: (0, _AdapterFn.ymdToUTC)(date),
          y: value
        });
      }
    });
    return d.reverse();
  },
  crConfigOption: option => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map