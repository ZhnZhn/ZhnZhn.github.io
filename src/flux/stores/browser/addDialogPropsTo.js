import crAddProps from './crAddProps';
import crSelectProps from './crSelectProps';

const _keys = Object.keys;

const _getItemDialogProps = item => {
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
  return item.dialogProps;
}

const addDialogPropsTo = (
  items,
  df
) => {
  const {
    dfAddProps
  } = df || {};
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
