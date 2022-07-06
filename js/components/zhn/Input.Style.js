"use strict";

exports.__esModule = true;
exports.getIsValidColor = exports.S_ROW = exports.S_INPUT = exports.S_HR = exports.S_ERR_MSG = void 0;
const S_ROW = {
  position: 'relative',
  display: 'inline-block',
  width: 250,
  backgroundColor: '#e1e1cb'
};
exports.S_ROW = S_ROW;
const S_INPUT = {
  background: 'transparent none repeat scroll 0 0',
  color: 'green',
  width: '100%',
  height: 30,
  paddingLeft: 10,
  border: 'medium none',
  outline: 'medium none',
  fontSize: '16px',
  fontWeight: 'bold'
};
exports.S_INPUT = S_INPUT;
const COLOR_VALID = '#1b75bb',
      COLOR_NOT_VALID = '#f44336';

const getIsValidColor = isValid => isValid ? COLOR_VALID : COLOR_NOT_VALID;

exports.getIsValidColor = getIsValidColor;
const S_HR = {
  width: 'auto',
  //width: '90%'
  //width: '230px'
  margin: '0 10px 5px 10px',
  borderWidth: 'medium medium 1px',
  borderStyle: 'none none solid',
  borderColor: COLOR_VALID,
  borderImage: 'none'
};
exports.S_HR = S_HR;
const S_ERR_MSG = {
  color: COLOR_NOT_VALID,
  padding: '0 0 5px 10px',
  fontSize: '12px',
  fontWeight: 'bold'
};
exports.S_ERR_MSG = S_ERR_MSG;
//# sourceMappingURL=Input.Style.js.map