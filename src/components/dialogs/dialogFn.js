import { isCategoryItem } from './ChartOptionsFn';
import { TYPE_T3AB } from './ChartOptionsTypes';

export const crIsId = id => `is${id}Select`;

export const crIsToggleInit = (
  selectProps
) => selectProps
 .reduce((toggleConfig, item) => {
    toggleConfig[crIsId(item.id)] = true
    return toggleConfig;
 }, Object.create(null));

export const getItemValue = (
  item
) => (item || {}).value

const _geSelectPropsCaption = (
  selectProps,
  index
) => selectProps[index].caption;

const _isChartTypeT3AB = (
  chartType
) => chartType && chartType.id === TYPE_T3AB;

const _isItemDf = () => true

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

export const crMsgs = (
  chartType,
  items,
  selectProps,
  msgOnNotSelected
) => _crMsgs(
  items,
  selectProps,
  msgOnNotSelected,
  _isChartTypeT3AB(chartType)
    ? i => i !== 1
    : isCategoryItem(chartType)
       ? i => i !== 0
       : void 0
)
