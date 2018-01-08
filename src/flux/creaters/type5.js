
const _crDefault = (props, options) => {
  const {
         isPremium, fnValue, loadId,
         dataSource, dfProps={}
       } = props
      , {
          one, two, three,
          fromDate, toDate,
          hasSecondYAxis, seriaType
        } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value)
           : undefined;
  return {
    ...dfProps,
    value : _value,
    title: `${one.caption}: ${two.caption}`,
    subtitle: three.caption,
    oneCaption: one.caption,
    one: one.value,
    two: two.value,
    three: three.value,
    fromDate, toDate,
    dataColumn: (three) ? three.value : 1,
    loadId,
    dataSource, isPremium,
    hasSecondYAxis, seriaType
  }
}

const _crType5A = (props, option) => {
  const r = _crDefault(props, option)
     , { one, two, three } = option
     , { fnValue, dataColumn=1 } = props
     , value = (typeof fnValue === 'function')
          ? fnValue(one.value, two.value, three.value)
          : undefined;

  Object.assign(r, { dataColumn, value })
  return r;
}

const _crTreeItem = (props, options) => {
  const { isPremium, fnValue, dataColumn, loadId, dataSource } = props
      , {
          one, two, three,
          fromDate, toDate,
          hasSecondYAxis, seriaType
        } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, three.value)
           : undefined
  return {
    value : _value,
    title : `${one.caption}:${two.caption}`,
    subtitle : three.caption,
    fromDate, toDate,
    dataColumn, loadId,
    dataSource, isPremium,
    hasSecondYAxis, seriaType
  };
};

const _crPlusTreeItem = (props, options) => {
  const { isPremium, fnValue, dataColumn, loadId, dataSource } = props
      , {
          one, two, three,
          fromDate, toDate,
          hasSecondYAxis, seriaType
        } = options
      , _value = (typeof fnValue === 'function')
           ? fnValue(one.value, two.value, three.value)
           : undefined
  return {
    value : _value,
    title : `${two.caption} : ${three.caption}`,
    subtitle : one.caption,
    fromDate, toDate,
    dataColumn, loadId,
    dataSource, isPremium,
    hasSecondYAxis, seriaType
  }
};

const _rFn = {
  DEFAULT : _crDefault,
  TreeItem : _crTreeItem,
  PlusTreeItem : _crPlusTreeItem,
  Type5A: _crType5A
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
