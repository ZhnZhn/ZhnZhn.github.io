
const createLoadOptions = (props={}, options={}) => {
  const {
          fnValue, dataColumn, loadId, dataSource,
          isPremium
        } = props
      , { one, two, fromDate, toDate, hasSecondYAxis } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value)
           : undefined
  return {
       value : _value,
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : dataColumn,
       loadId : loadId,
       title : one.caption,
       subtitle : two.caption,
       isPremium : isPremium,
       dataSource: dataSource,
       hasSecondYAxis: hasSecondYAxis
    }
}

export default createLoadOptions
