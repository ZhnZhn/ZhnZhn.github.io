import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'


const { crData, crConfOption } = fnAdapter
, _assign = Object.assign;

const V_ON_TIME = 'Values on 00:00 GMT';

const _crTitle = (title) => `${title}: ${V_ON_TIME}`;

const _getConversionType = ({ ConversionType }) =>
  ConversionType || {};

const _getTsym = (json, option) => {
  const {
    conversionSymbol,
    type=''
  } = _getConversionType(json);
  return {
    tsym: conversionSymbol || option.tsym,
    type
  };
};

const _crSubtitle = (json, option) => {
  const { value, exchange } = option
  , { tsym, type } = _getTsym(json, option);  
  return `${exchange}: ${value}/${tsym} ${type}`;
};

const _crBtTitleTo = (json, option) => {
  const { tsym } = _getTsym(json, option);
  return tsym;
};

const _crMiniVolume = (title, dColumn, dVolume) => ({
  btTitle: `Volume ${title}`,
  dColumn, dVolume
});

const trOption = (option, json) => {
  const { title } = option
  _assign(option, {
    itemCaption: title,
    title: _crTitle(title),
    subtitle: _crSubtitle(json, option)
  })
};

const addConfig = (builder, json, option, data) => {
  const _btTitleTo = _crBtTitleTo(json, option)
  , { value } = option
  , {
     dVolume, dColumn,
     dToVolume,
     dHL
  } = data;
  return builder
    .addMiniVolume(_crMiniVolume(value, dColumn, dVolume))
    .addMiniVolume(_crMiniVolume(_btTitleTo, [], dToVolume))
    .addMiniHL({ data: dHL })
};

const toHdConfig = crAdapterType1({
  crData,
  crConfOption,
  trOption,
  addConfig
});

export default toHdConfig
