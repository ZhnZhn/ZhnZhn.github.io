
const _crDefault = (props, options) => {
  const { isPremium, fnValue, loadId, dataSource, dfProps={} } = props
      , { one, two, three, fromDate, toDate, hasSecondYAxis } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value)
           : undefined
  return {
    ...dfProps,
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: (three) ? three.value : 1,
    loadId: loadId,
    title: `${one.caption}: ${two.caption}`,
    subtitle: three.caption,
    dataSource: dataSource,
    isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis,
    oneCaption: one.caption,
    one: one.value,
    two: two.value,
    three: three.value
  }
}

const _crTreeItem = (props, options) => {
  const { isPremium, fnValue, dataColumn, loadId, dataSource } = props
      , { one, two, three, fromDate, toDate, hasSecondYAxis } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, three.value)
           : undefined
  return {
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn : dataColumn,
    loadId : loadId,
    title : `${one.caption}:${two.caption}`,
    subtitle : three.caption,
    dataSource : dataSource,
    isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis
  };
};

const _crPlusTreeItem = (props, options) => {
  const { isPremium, fnValue, dataColumn, loadId, dataSource } = props
      , { one, two, three, fromDate, toDate, hasSecondYAxis } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value, three.value)
           : undefined
  return {
    value : _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn : dataColumn,
    loadId : loadId,
    title : `${two.caption} : ${three.caption}`,
    subtitle : one.caption,
    dataSource : dataSource,
    isPremium : isPremium,
    hasSecondYAxis: hasSecondYAxis
  }
};

const _rFn = {
  DEFAULT : _crDefault,
  TreeItem : _crTreeItem,
  PlusTreeItem : _crPlusTreeItem
}

const createLoadOptions = (props={}, options={}) => {
  const { fnValueType } = props
      , _createLoadOption = _rFn[fnValueType]
  if (typeof _createLoadOption === 'function'){
    return _createLoadOption(props, options);
  } else {
    return _rFn.DEFAULT(props, options);
  }
};

export default createLoadOptions
