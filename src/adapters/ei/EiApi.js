import { checkResponseData } from '../ApiFn';
import {
  isTreeMap,
  isCategory
} from '../CategoryFn';

const DATA_URL = './data/ei';

const _crApiUrl = (
  option
) => {
  const { items } = option
  , metric = items[1].v
  return `${DATA_URL}/${metric}`;
}

const _crLineUrl = (
  option
) => {
  const { items } = option
  , geo = items[0].v;
  return `${_crApiUrl(option)}/${geo}.json`;
};

const _crCategoryUrl = (
  option
) => {
  const { time } = option;
  return `${_crApiUrl(option)}/by-geo-${time}.json`;
}

const _crTreeMapUrl = (option) => {
  const {
    items,
    time,
    dfTmToken
  } = option
  , geo = items[0].v;

  if (time !== '2023') {
    throw {
      message: "TreeMap only available for 2023"
    };
  }

  return `${DATA_URL}/${dfTmToken}-tm/${geo}-${time}.json`;
}

const IrenaApi = {
  getRequestUrl(option){
    return isTreeMap(option.seriaType)
      ? _crTreeMapUrl(option)
      :  isCategory(option.seriaType)
          ? _crCategoryUrl(option)
          : _crLineUrl(option);
  },
  checkResponse: checkResponseData
};

export default IrenaApi
