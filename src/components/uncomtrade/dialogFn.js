import {
  getC
} from '../../utils/getPropertyFn';

export const crInputSelectDfProps = (
  options,
  dfItemIndex=0
) => {
  const dfItem = options[dfItemIndex];
  return [
    dfItem,
    `Default: ${getC(dfItem)}`
  ];
}
