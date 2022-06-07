"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _checkAreDatesValid = _interopRequireDefault(require("./checkAreDatesValid"));

const crValidationMessages = (configs, msgOnNotSelected, refDates) => {
  const msgs = configs.reduce((arr, conf) => {
    if (!conf[0]) {
      arr.push(msgOnNotSelected(conf[1]));
    }

    return arr;
  }, []);
  (0, _checkAreDatesValid.default)(refDates, msgs);
  return msgs;
};

var _default = crValidationMessages;
exports.default = _default;
//# sourceMappingURL=crValidationMessages.js.map