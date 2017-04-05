

const createLoadOptions = (props={}, options={}) => {
  const {
         fnValue, columnName, dataColumn,
         seriaColumnNames, loadId, dataSource
        } = props
      , { exchange, item, type, fromDate } = options
      , _value = (typeof fnValue === 'function')
          ? fnValue(exchange.value, item.value, type.value)
          : undefined
      , _subtitle = (columnName)
            ? `${type.caption}:${columnName}`
            : `${type.caption}`
  return {
     value : _value,
     title : `${exchange.caption}:${item.caption}`,
     subtitle : _subtitle,
     columnName : columnName,
     seriaColumnNames: seriaColumnNames,
     dataColumn : dataColumn,
     loadId : loadId,
     fromDate : fromDate,
     dataSource : dataSource
  };
};

export default createLoadOptions
