import { fCheckResponse } from '../AdapterFn';
import { isCategory } from '../CategoryFn';

const DATA_URL = './data/irena';

const _crApiUrl = (
  option
) => {
  const { items } = option
  , metric = items[1].v
  , source = items[2].v;
  return `${DATA_URL}/${metric}/${source}`;
}

const _crLineUrl = (
  option
) => {
  const { items } = option
  , geo = items[0].v;
  return `${_crApiUrl(option)}/${geo}.json`;
}

const _crCategoryUrl = (
  option
) => {
  const { time } = option;
  return `${_crApiUrl(option)}/by-geo-${time}.json`;
}

const IrenaApi = {
  getRequestUrl(option){
    return isCategory(option.seriaType)
      ? _crCategoryUrl(option)
      : _crLineUrl(option);
  },
  checkResponse: fCheckResponse()
};

export default IrenaApi
