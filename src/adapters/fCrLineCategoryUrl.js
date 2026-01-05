import { getValue } from '../utils/itemFn';

const TS_TYPE_21 = 21;

const _crApiUrl = (
  items
) => getValue(items[1]);
const _crBaApiUrl = (
  items
) => `${getValue(items[2])}-${getValue(items[1])}`;

const fCrLineCategoryUrl = (dataUrl) => {
  const _crApiToken = option => {
    const _crToken = option.dfTs === TS_TYPE_21
      ? _crBaApiUrl
      : _crApiUrl;
    return `${dataUrl}/${_crToken(option.items)}`;
  };

  const _crLineUrl = (
    option
  ) => {
    const { items } = option
    , geo = getValue(items[0]);
    return `${_crApiToken(option)}/${geo}.json`;
  };

  const _crCategoryUrl = (
    option
  ) => `${_crApiToken(option)}/by-geo-${option.time}.json`;

  return [
    _crLineUrl,
    _crCategoryUrl
  ];
};

export default fCrLineCategoryUrl
