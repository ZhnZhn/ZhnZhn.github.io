"use strict";

exports.__esModule = true;
exports.crInputProps = exports.crInputNumberProps = void 0;
const crInputProps = function (type, spellCheck) {
  if (type === void 0) {
    type = "text";
  }
  if (spellCheck === void 0) {
    spellCheck = false;
  }
  const [_autoCorrect, _spellCheck] = spellCheck ? ["on", "true"] : ["off", "false"];
  return {
    type: type,
    autoCapitalize: "off",
    autoComplete: "off",
    autoCorrect: _autoCorrect,
    spellCheck: _spellCheck
  };
};
exports.crInputProps = crInputProps;
const _getNumberLength = n => (n + "").length;
const crInputNumberProps = (initialValue, min, max) => ({
  type: "number",
  inputMode: "numeric",
  initValue: initialValue,
  min,
  max,
  maxLength: Math.max(_getNumberLength(min), _getNumberLength(max))
});
exports.crInputNumberProps = crInputNumberProps;
//# sourceMappingURL=inputFn.js.map