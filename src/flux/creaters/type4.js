import { isFn } from '../../utils/is'

const createLoadOptions = (props={}, options={}) => {
  const { fnValue, dataColumn, loadId, isPremium } = props
      , { one, two, fromDate, toDate } = options
      , _value = isFn(fnValue)
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
       isPremium : isPremium
    }
}

export default createLoadOptions
