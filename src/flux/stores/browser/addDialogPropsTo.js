import {
  isArr,
  isObj
} from '../../../utils/isTypeFn';

import crAddProps from './crAddProps';
import crSelectProps from './crSelectProps';

const _getObjectKeys = Object.keys;

const _checkItemDfIdCase = item => {
  const {
    dfId,
    mapDateDf,
    mapFrequency
  } = item;
  if (dfId) {
    const _dfProps = mapDateDf
      ? { mapDateDf }
      : {};
    if (mapFrequency) {
      _dfProps.mapFrequency = mapFrequency
    }
    item.dialogProps = {
      dfProps: {
        ..._dfProps,
        dfId
      }
    }
  }
}
, _getItemDialogProps = item => {
  _checkItemDfIdCase(item)
  return item.dialogProps;
}
, VALID_ITEM_ID_TYPE_REGEX = RegExp("^[A-Z_]*$")
, _setItemFromTupleTo = (
  items,
  tuple,
  props
) => {
  const _idType = ""+tuple[0];
  if (VALID_ITEM_ID_TYPE_REGEX.test(_idType)) {
    items[_idType] = {
      ...props,
      type: _idType,
      menuTitle: tuple[1],
      dfId: tuple[2]
    }
  }
}
, _setItemsFromTuples = (
  items,
  tuples,
  itemProp
) => {
  if (isArr(tuples)) {
    tuples.forEach(tuple => {
      _setItemFromTupleTo(items, tuple, itemProp)
    })
  }
}
, _checkItemsTuplesCase = (
  items,
  tuples
) => {
  _setItemsFromTuples(items, tuples)
}
, _checkItemsIdTupleCase = (
  items,
  idTuple
) => {
  if (isObj(idTuple)) {
    _getObjectKeys(idTuple).forEach(key => {
      _setItemsFromTuples(items, idTuple[key], {addProps: key})
    })
  }
};

const addDialogPropsTo = (
  items,
  df
) => {
  const {
    dfAddProps,
    tuples,
    idTuple
  } = df || {};
  _checkItemsTuplesCase(items, tuples)
  _checkItemsIdTupleCase(items, idTuple)
  _getObjectKeys(items).forEach(pnId => {
    const item = items[pnId]
    , addPropsId = item.addProps || dfAddProps;
    if (addPropsId && item.type) {
      const dialogProps = _getItemDialogProps(item)
      , [
        dialogType,
        addProps
      ] = crAddProps(items, addPropsId)
      , _selectProps = crSelectProps(addProps, dialogProps);

      item.dialogType = item.dialogType || dialogType
      item.dialogProps = {
        ...addProps,
        ...dialogProps,
        ..._selectProps
      }
      item.dialogProps.dfProps = {
        ...addProps.dfProps,
        ...dialogProps.dfProps
      }
    }
  })
};

export default addDialogPropsTo
