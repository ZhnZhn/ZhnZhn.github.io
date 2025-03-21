"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _crAddProps = _interopRequireDefault(require("./crAddProps"));
var _crSelectProps = _interopRequireDefault(require("./crSelectProps"));
const _getObjectKeys = Object.keys;
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
  _setItemFromTupleTo = (items, tuple, props) => {
    const _idType = "" + tuple[0];
    if (VALID_ITEM_ID_TYPE_REGEX.test(_idType)) {
      items[_idType] = {
        ...props,
        type: _idType,
        menuTitle: tuple[1],
        dfId: tuple[2]
      };
    }
  },
  _setItemsFromTuples = (items, tuples, itemProp) => {
    if ((0, _isTypeFn.isArr)(tuples)) {
      tuples.forEach(tuple => {
        _setItemFromTupleTo(items, tuple, itemProp);
      });
    }
  },
  _checkItemsIdTupleCase = (items, idTuple) => {
    if ((0, _isTypeFn.isObj)(idTuple)) {
      _getObjectKeys(idTuple).forEach(key => {
        _setItemsFromTuples(items, idTuple[key], {
          addProps: key
        });
      });
    }
  };
const addDialogPropsTo = (items, df) => {
  const {
    dfAddProps,
    idTuple
  } = df || {};
  _checkItemsIdTupleCase(items, idTuple);
  _getObjectKeys(items).forEach(pnId => {
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