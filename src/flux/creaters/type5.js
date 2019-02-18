
const _isFn = fn => typeof fn === 'function';
const _crTitle = (one, two) => `${one.caption}: ${two.caption}`;

const _crDefault = (props, options) => {
  const {
         isPremium, fnValue, loadId,
         dataSource, dfProps
       } = props
      , {
          one, two, three,
          fromDate, toDate,
          hasSecondYAxis, seriaType
        } = options
      , _value = _isFn(fnValue)
           ? fnValue(one.value, two.value)
           : undefined;
  return {
    ...dfProps,
    value : _value,
    title: _crTitle(one, two),
    subtitle: three.caption,
    oneCaption: one.caption,
    one: one.value,
    two: two.value,
    three: three.value,
    fromDate, toDate,
    dataColumn: three ? three.value : 1,
    loadId,
    dataSource, isPremium,
    hasSecondYAxis, seriaType
  }
}

const _crType5A = (props, option) => {
  const r = _crDefault(props, option)
     , { one, two, three } = option
     , { fnValue, dataColumn=1 } = props
     , value = _isFn(fnValue)
          ? fnValue(one.value, two.value, three.value)
          : undefined;

  Object.assign(r, { dataColumn, value })
  return r;
}

const _crTreeItem = (props, options) => {
  const {
    isPremium, fnValue,
    dataColumn, loadId, dataSource,
    dfProps
  } = props
  , {
      one, two, three,
      fromDate, toDate,
      hasSecondYAxis, seriaType
    } = options
  , _value = _isFn(fnValue)
       ? fnValue(one.value, three.value)
       : undefined;
  return {
    ...dfProps,
    value : _value,
    title : _crTitle(one, two),
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
      , _value = _isFn(fnValue)
           ? fnValue(one.value, two.value, three.value)
           : undefined
  return {
    value : _value,
    title : _crTitle(two, three),
    subtitle : one.caption,
    fromDate, toDate,
    dataColumn, loadId,
    dataSource, isPremium,
    hasSecondYAxis, seriaType
  }
};

const _rFn = {
  DF : _crDefault,
  TreeItem : _crTreeItem,
  PlusTreeItem : _crPlusTreeItem,
  Type5A: _crType5A
}

const createLoadOptions = (props={}, options={}) => {
  const { fnValueType } = props
      , _createLoadOption = _rFn[fnValueType];
  return _isFn(_createLoadOption)
    ? _createLoadOption(props, options)
    : _rFn.DF(props, options);
};

export default createLoadOptions
