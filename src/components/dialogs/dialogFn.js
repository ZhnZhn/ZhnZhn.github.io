import { isCategoryItem } from './ChartOptionsFn';

export const getItemValue = (
  item
) => (item || {}).value

const _geSelectPropsCaption = (
  selectProps,
  index
) => selectProps[index].caption;

const _isItemDf = () => true;

const _crMsgs = (
  items,
  selectProps,
  msgOnNotSelected,
  isItem = _isItemDf
) => selectProps
 .reduce((msgs, _, i) => {
    if (isItem(i) && !items[i]) {
      msgs.push(msgOnNotSelected(
        _geSelectPropsCaption(selectProps, i))
      )
    }
    return msgs;
  }, []);

const _fIsItem = (
  chartType,
  selectProps
) => {
  const dfIsItem = i => i !== 0
  , { dim } = chartType;
  if (dim) {
    const dimIndex = selectProps
      .findIndex(item => item.caption === dim)
    return dimIndex !== -1
      ? i => i !== dimIndex
      : dfIsItem
  }
  return dfIsItem;
}

const _crIsItem = (
  chartType,
  selectProps
) => isCategoryItem(chartType)
  ? _fIsItem(chartType, selectProps)
  : void 0

export const crMsgs = (
  chartType,
  items,
  selectProps,
  msgOnNotSelected
) => _crMsgs(
  items,
  selectProps,
  msgOnNotSelected,
  _crIsItem(chartType, selectProps)
)
