
const createLoadOptions = (props={}, options={}) => {
  const {
          fnValue, dataColumn, loadId, dataSource,
          isPremium, dfProps={}
        } = props
      , { one, two, fromDate, toDate, hasSecondYAxis } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value)
           : undefined
  return {
       ...dfProps,
       value: _value,
       fromDate: fromDate,
       toDate: toDate,
       dataColumn: dataColumn,
       loadId: loadId,
       title: one.caption,
       subtitle: two.caption,
       isPremium: isPremium,
       dataSource: dataSource,
       hasSecondYAxis: hasSecondYAxis,
       oneCaption: one.caption,
       twoCaption: two.caption,
       one: one.value,
       two: two.value,
    }
}

export default createLoadOptions
