
import crSelectProps from './crSelectProps'

const addDialogPropsTo = items => {
  Object.keys(items).forEach(propName => {
    const item = items[propName]
        , addProps = item.addProps;
    if (addProps !== undefined) {
      const dialogProps = item.dialogProps
      , baseProps = items[addProps].dialogProps
      , _selectProps = crSelectProps(baseProps, dialogProps);
      item.dialogProps = Object.assign({},
        baseProps, dialogProps, _selectProps
      )
    }
  })
};

export default addDialogPropsTo
