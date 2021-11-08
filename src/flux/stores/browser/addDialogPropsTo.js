import crAddProps from './crAddProps';
import crSelectProps from './crSelectProps';

const _assign = Object.assign
, _keys = Object.keys;

const addDialogPropsTo = (items, df) => {
  const { dfAddProps } = df || {};
  _keys(items).forEach(pnId => {
    const item = items[pnId]
    , addPropsId = item.addProps || dfAddProps;
    if (addPropsId) {
      const { dialogProps } = item
      , addProps = crAddProps(items, addPropsId)
      , _selectProps = crSelectProps(addProps, dialogProps);

      item.dialogProps = _assign({},
        addProps, dialogProps, _selectProps
      )
      item.dialogProps.dfProps = _assign({},
        addProps.dfProps, dialogProps.dfProps
      )
    }
  })
};

export default addDialogPropsTo
