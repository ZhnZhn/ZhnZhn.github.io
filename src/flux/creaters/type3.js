
const createLoadOptions = (props={}, options={}) => {
  const {
          columnName, dataColumn, seriaColumnNames, loadId,
          fnValue, fnItemCaption,
          linkFn, dataSource,
          dfProps
        } = props
      , { fromDate, toDate, stock, transform } = options
      , _value = (typeof fnValue === 'function')
            ? fnValue(stock.value)
            : stock.value
      , _itemCaption = (typeof fnItemCaption === 'function')
            ? fnItemCaption(stock.value)
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
    title: stock.caption,
    subtitle: _subtitle,
    stock: stock,
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
