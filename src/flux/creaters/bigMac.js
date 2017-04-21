const createLoadOptions = (props={}, options={}) => {
  const {
          fnValue, loadId, dataSource, isPremium
        } = props
      , { one:country, two:metric, fromDate, toDate } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(country.value)
           : undefined
       , _dataColumn = (metric) ? metric.value : 1
       , _subtitle = (metric) ? metric.caption : 'Local Price';

     return {
        viewKey: _value + '_' + _dataColumn,
        value : _value,
        fromDate: fromDate,
        toDate: toDate,
        dataColumn : _dataColumn,
        itemCaption : country.caption,
        loadId : loadId,
        title : country.caption,
        subtitle : _subtitle,
        dataSource : dataSource,
        isPremium : isPremium
     }
}

export default createLoadOptions
