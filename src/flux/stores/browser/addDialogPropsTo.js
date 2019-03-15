
import crSelectProps from './crSelectProps'

const _assign = Object.assign

const _crInitialProps = (addProps, items) => {
  const initialProps = {}
  , _config = items[addProps]
  , _extends = _config.extends;

  if (typeof(_extends) === 'string') {
    _assign(initialProps, items[_extends].dialogProps)
  } else if (Array.isArray(_extends)) {
    _extends.forEach(id => {
      _assign(initialProps, items[id].dialogProps)
    })
  }
  return _assign(initialProps, _config.dialogProps);
}

const addDialogPropsTo = items => {
  Object.keys(items).forEach(propName => {
    const item = items[propName]
        , addProps = item.addProps;
    if (addProps !== undefined) {
      const dialogProps = item.dialogProps
      , initialProps = _crInitialProps(addProps, items)
      , _selectProps = crSelectProps(initialProps, dialogProps);
      item.dialogProps = _assign({},
        initialProps, dialogProps, _selectProps
      )
    }
  })
};

export default addDialogPropsTo
