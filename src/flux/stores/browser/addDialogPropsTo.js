import crAddProps from './crAddProps'
import crSelectProps from './crSelectProps'

const _assign = Object.assign
, _isUndef = v => typeof v === 'undefined';

const addDialogPropsTo = items => {
  Object.keys(items).forEach(pnId => {
    const item = items[pnId]
    , addPropsId = item.addProps;
    if (!_isUndef(addPropsId)) {
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
