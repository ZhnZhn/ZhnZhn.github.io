import crAddProps from './crAddProps';
import crSelectProps from './crSelectProps';

const _isArr = Array.isArray
, _keys = Object.keys;

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
, _checkItemsTuplesCase = (
  items,
  tuples
) => {
  if (_isArr(tuples)) {
    tuples.forEach(tuple => {
      items[tuple[0]] = {
        type: tuple[0],
        menuTitle: tuple[1],
        dfId: tuple[2]
      }
    })
  }
};

const addDialogPropsTo = (
  items,
  df
) => {
  const {
    dfAddProps,
    tuples
  } = df || {};
  _checkItemsTuplesCase(items, tuples)
  _keys(items).forEach(pnId => {
    const item = items[pnId]
    , addPropsId = item.addProps || dfAddProps;
    if (addPropsId) {
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
