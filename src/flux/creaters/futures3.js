

const createLoadOptions = (props={}, options={}) => {
  const {
          fnValue, columnName, dataColumn,
          seriaColumnNames, loadId, dataSource
        } = props
      , { item, month, year, fromDate } = options
      , _value = (typeof fnValue === 'function')
            ? fnValue(item.value, month.value, year.value )
            : undefined
      , _subtitle = (columnName)
            ? `${month.caption}:${year.caption}:${columnName}`
            : `${month.caption}:${year.caption}`

  return {
     value : _value,
     title : item.caption,
     subtitle : _subtitle,
     columnName : columnName,
     dataColumn : dataColumn,
     loadId : loadId,
     fromDate : fromDate,
     seriaColumnNames : seriaColumnNames,
     dataSource: dataSource
  };
};

export default createLoadOptions
