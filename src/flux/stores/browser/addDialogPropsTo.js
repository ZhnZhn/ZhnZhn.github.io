import { isObj } from '../../../utils/isTypeFn';
import { safeLoopOfArray } from '../../../utils/arrFn';

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
    delete item.dfId
  }
}
, _getItemDialogProps = item => {
  _checkItemDfIdCase(item)
  return item.dialogProps;
}
, VALID_ITEM_ID_TYPE_REGEX = RegExp("^[A-Z_0-9]+$")
, _setItemFromTupleTo = (
  items,
  tuplesKey,
  tuple,
  crDialogItem
) => {
  const _idType = ""+tuple[0];
  if (VALID_ITEM_ID_TYPE_REGEX.test(_idType)) {
    items[_idType] = crDialogItem(
      _idType,
      tuplesKey,
      tuple
    )
  }
}
, _crDialogItemDf = (
  type,
  tuplesKey,
  tuple
) => ({
  type,
  addProps: tuplesKey,
  menuTitle: tuple[1],
  dfId: tuple[2]
})
, _checkItemsIdTupleCase = (
  items,
  idTuple,
  idCase
) => {
  safeLoopOfArray(isObj(idTuple) && _getObjectKeys(idTuple), tuplesKey => {
    safeLoopOfArray(idTuple[tuplesKey], tuple => _setItemFromTupleTo(
      items,
      tuplesKey,
      tuple,
      _crDialogItemDf
    ))
  })
};

const addDialogPropsTo = (
  items,
  df
) => {
  const {
    dfAddProps,
    idTuple
  } = df || {};
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
      delete item.addProps
    }
  })
};

export default addDialogPropsTo
