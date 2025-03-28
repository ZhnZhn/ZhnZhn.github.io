"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _arrFn = require("../../../utils/arrFn");
var _crAddProps = _interopRequireDefault(require("./crAddProps"));
var _crSelectProps = _interopRequireDefault(require("./crSelectProps"));
const _checkItemDfIdCase = item => {
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
      delete item.dfId;
    }
  },
  _getItemDialogProps = item => {
    _checkItemDfIdCase(item);
    return item.dialogProps;
  },
  VALID_ITEM_ID_TYPE_REGEX = RegExp("^[A-Z_0-9]+$"),
  _setItemFromTupleTo = (items, tuplesKey, tuple, crDialogItem) => {
    const _idType = "" + tuple[0];
    if (VALID_ITEM_ID_TYPE_REGEX.test(_idType)) {
      items[_idType] = {
        ...crDialogItem(tuple),
        type: _idType,
        menuTitle: tuple[1],
        addProps: tuplesKey
      };
    }
  },
  _crUnTwoUriPath = (tuple, typeSuffix) => typeSuffix + "-" + (tuple[2] || "").toLowerCase().replaceAll(",", "").replaceAll(" ", "-"),
  _crDialogItemUn = tuple => {
    const _typeSuffix = (tuple[0] || "").split("_")[1];
    return {
      contFullCaption: `UN Comtrade: ${tuple[2]}: ${_typeSuffix}`,
      dialogType: "UnDialog5",
      dfId: _crUnTwoUriPath(tuple, _typeSuffix)
    };
  },
  _crDialogItemDf = tuple => ({
    dfId: tuple[2]
  }),
  _fCrDialogItem = idCase => idCase === "UN" ? _crDialogItemUn : _crDialogItemDf,
  _checkItemsIdTupleCase = (items, idTuple, idCase) => {
    (0, _arrFn.safeLoopOfArray)((0, _isTypeFn.getObjectKeys)(idTuple), tuplesKey => {
      (0, _arrFn.safeLoopOfArray)(idTuple[tuplesKey], tuple => _setItemFromTupleTo(items, tuplesKey, tuple, _fCrDialogItem(idCase)));
    });
  };
const addDialogPropsTo = (items, df) => {
  const {
    dfAddProps,
    idTuple,
    idCase
  } = df || {};
  _checkItemsIdTupleCase(items, idTuple, idCase);
  (0, _isTypeFn.getObjectKeys)(items).forEach(pnId => {
    const item = items[pnId],
      addPropsId = item.addProps || dfAddProps;
    if (addPropsId && item.type) {
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
      delete item.addProps;
    }
  });
};
var _default = exports.default = addDialogPropsTo;
//# sourceMappingURL=addDialogPropsTo.js.map