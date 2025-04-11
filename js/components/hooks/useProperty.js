"use strict";

exports.__esModule = true;
exports.useRefInit = exports.useRefBool = exports.useProperty = void 0;
var _uiApi = require("../uiApi");
const useProperty = (initialValue, dfValue) => {
  const ref = (0, _uiApi.useRef)(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps */
  return (0, _uiApi.useMemo)(() => [
  //setValue
  v => {
    ref.current = v;
  },
  //getValue
  () => ref.current || dfValue], []);
  // dfValue
  /*eslint-enable react-hooks/exhaustive-deps */
};
exports.useProperty = useProperty;
const useRefBool = initialValue => {
  const ref = (0, _uiApi.useRef)(initialValue),
    [setTrue, setFalse] = (0, _uiApi.useMemo)(() => [() => ref.current = true, () => ref.current = false], []);
  return [ref, setTrue, setFalse];
};
exports.useRefBool = useRefBool;
const useRefInit = crValue => {
  const ref = (0, _uiApi.useRef)(null);
  if (ref.current === null) {
    ref.current = crValue();
  }
  return ref.current;
};
exports.useRefInit = useRefInit;
//# sourceMappingURL=useProperty.js.map