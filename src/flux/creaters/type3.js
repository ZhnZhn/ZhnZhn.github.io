

const createLoadOptions = (props={}, options={}) => {
  const {
          columnName, dataColumn, seriaColumnNames, loadId,
          fnValue, fnItemCaption,
          linkFn
        } = props
      , { fromDate, toDate, stock } = options
      , _value = (typeof fnValue === 'function')
                ? fnValue(stock.value) : stock.value
      , _itemCaption = (typeof fnItemCaption === 'function')
                ? fnItemCaption(stock.value) : undefined;
  return {
    //value : this.stock.value,
    value : _value,
    title: stock.caption,
    stock: stock,
    fromDate: fromDate,
    toDate: toDate,
    columnName : columnName,
    dataColumn : dataColumn,
    itemCaption : _itemCaption,
    loadId : loadId,
    linkFn : linkFn,
    seriaColumnNames
  }
}

export default createLoadOptions
