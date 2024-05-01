"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAddProps = _interopRequireDefault(require("./crAddProps"));
var _crSelectProps = _interopRequireDefault(require("./crSelectProps"));
const _keys = Object.keys;
const _getItemDialogProps = item => {
  const {
    dfId,
    mapDateDf,
    mapFrequency
  } = item;
  if (dfId) {
    const _dfProps = mapDateDf ? {
      mapDateDf
    } : {};
    if (mapFrequency) {
      _dfProps.mapFrequency = mapFrequency;
    }
    item.dialogProps = {
      dfProps: {
        ..._dfProps,
        dfId
      }
    };
  }
  return item.dialogProps;
};
const addDialogPropsTo = (items, df) => {
  const {
    dfAddProps
  } = df || {};
  _keys(items).forEach(pnId => {
    const item = items[pnId],
      addPropsId = item.addProps || dfAddProps;
    if (addPropsId) {
      const dialogProps = _getItemDialogProps(item),
        [dialogType, addProps] = (0, _crAddProps.default)(items, addPropsId),
        _selectProps = (0, _crSelectProps.default)(addProps, dialogProps);
      item.dialogType = item.dialogType || dialogType;
      item.dialogProps = {
        ...addProps,
        ...dialogProps,
        ..._selectProps
      };
      item.dialogProps.dfProps = {
        ...addProps.dfProps,
        ...dialogProps.dfProps
      };
    }
  });
};
var _default = exports.default = addDialogPropsTo;
//# sourceMappingURL=addDialogPropsTo.js.map