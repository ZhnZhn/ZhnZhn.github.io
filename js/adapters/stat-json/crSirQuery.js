"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crDfArrQuery = _interopRequireDefault(require("./crDfArrQuery"));

const _trOptionItems = option => {
  option.items = option.items.map(item => {
    const {
      caption,
      slice
    } = item || {},
          _item = {
      caption,
      slice: {}
    };

    for (const propName in slice) {
      _item.slice[propName.toUpperCase()] = slice[propName];
    }

    return _item;
  });
};

const _trOptionDfC = option => {
  if (option.dfC) {
    option.dfC = option.dfC.toUpperCase();
  }
};

const crSirQuery = option => {
  _trOptionItems(option);

  _trOptionDfC(option);

  const query = (0, _crDfArrQuery.default)(option);
  return {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      query,
      response: {
        format: "json-stat2",
        pivot: null
      }
    })
  };
};

var _default = crSirQuery;
exports.default = _default;
//# sourceMappingURL=crSirQuery.js.map