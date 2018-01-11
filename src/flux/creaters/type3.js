
const createLoadOptions = (props={}, options={}) => {
  const {
          columnName, dataColumn, seriaColumnNames, loadId,
          fnValue, fnItemCaption,
          linkFn, dataSource,
          dfProps
        } = props
      , { one, fromDate, toDate, transform } = options
      , { value, caption } = one
      , _value = (typeof fnValue === 'function')
            ? fnValue(value)
            : value
      , _itemCaption = (typeof fnItemCaption === 'function')
            ? fnItemCaption(value)
            : undefined
      , _transform = (transform)
            ? transform.value
            : undefined
      , _subtitle = (transform)
            ? transform.caption
            : undefined;
  return {
    value : _value,
    transform: _transform,
    title: caption,
    subtitle: _subtitle,
    item: one,    
    oneCaption: caption,
    fromDate: fromDate,
    toDate: toDate,
    columnName : columnName,
    dataColumn : dataColumn,
    itemCaption : _itemCaption,
    loadId : loadId,
    linkFn : linkFn,
    seriaColumnNames, dataSource,
    ...dfProps
  }
}

export default createLoadOptions
