
const createLoadOptions = (props={}, options={}) => {
  const {
          fnValue, dataColumn, loadId, dataSource,
          isPremium, linkFn, dfProps={}
        } = props
      , {
          one, two, three={},
          fromDate, toDate,
          hasSecondYAxis
        } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value)
           : one.value;

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
       linkFn: linkFn,
       oneCaption: one.caption,
       twoCaption: two.caption,
       threeCaption: three.caption,
       one: one.value,
       two: two.value,
       three: three.value,
       items: [ one, two, three ]
    }
}

export default createLoadOptions
