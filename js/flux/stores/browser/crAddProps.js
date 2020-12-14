"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assign = Object.assign,
    _isArr = Array.isArray,
    _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _getSelectProps = function _getSelectProps(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      selectProps = _ref.selectProps;

  return _isArr(selectProps) ? selectProps : [];
};

var _getDialogProps = function _getDialogProps(_temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      dialogProps = _ref2.dialogProps;

  return dialogProps;
};

var _assignConfigTo = function _assignConfigTo(toObj, conf1, conf2) {
  var dialogProps1 = _getDialogProps(conf1),
      dialogProps2 = _getDialogProps(conf2),
      _selectProps = [].concat(_getSelectProps(toObj), _getSelectProps(dialogProps2), _getSelectProps(dialogProps1));

  _assign(toObj, dialogProps2, dialogProps1);

  toObj.selectProps = _selectProps;
  return toObj;
};

var _crExtendsProps = function _crExtendsProps(items, conf1) {
  var _extends1 = conf1["extends"],
      conf2 = _isStr(_extends1) ? items[_extends1] : void 0;
  return _assignConfigTo({}, conf1, conf2);
};

var crAddProps = function crAddProps(items, addPropsId) {
  var _conf = items[addPropsId],
      _extends = _conf["extends"],
      initialProps = _isStr(_extends) ? _crExtendsProps(items, items[_extends]) : {};
  return _assignConfigTo(initialProps, _conf);
};

var _default = crAddProps;
exports["default"] = _default;
//# sourceMappingURL=crAddProps.js.map