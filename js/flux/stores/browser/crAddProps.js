"use strict";

exports.__esModule = true;
exports.default = void 0;
const _assign = Object.assign,
  _isArr = Array.isArray,
  _isStr = str => typeof str === 'string';
const _getSelectProps = function (_temp) {
  let {
    selectProps
  } = _temp === void 0 ? {} : _temp;
  return _isArr(selectProps) ? selectProps : [];
};
const _getDialogProps = function (_temp2) {
  let {
    dialogProps
  } = _temp2 === void 0 ? {} : _temp2;
  return dialogProps;
};
const _assignConfigTo = (toObj, conf1, conf2) => {
  const dialogProps1 = _getDialogProps(conf1),
    dialogProps2 = _getDialogProps(conf2),
    _selectProps = [..._getSelectProps(toObj), ..._getSelectProps(dialogProps2), ..._getSelectProps(dialogProps1)];
  _assign(toObj, dialogProps2, dialogProps1);
  if (_selectProps.length > 0) {
    toObj.selectProps = _selectProps;
  }
  return toObj;
};
const _crExtendsProps = (items, conf1) => {
  const _extends1 = conf1.extends,
    conf2 = _isStr(_extends1) ? items[_extends1] : void 0;
  return _assignConfigTo({}, conf1, conf2);
};

// [dialogType, addProps]
const crAddProps = (items, addPropsId) => {
  const _conf = items[addPropsId],
    _extends = _conf.extends,
    initialProps = _isStr(_extends) ? _crExtendsProps(items, items[_extends]) : {};
  return [_conf.dialogType, _assignConfigTo(initialProps, _conf)];
};
var _default = crAddProps;
exports.default = _default;
//# sourceMappingURL=crAddProps.js.map