import crAdapterType1 from '../crAdapterType1'
import fnAdapter from './fnAdapter'


const { crData, crConfOption } = fnAdapter
, _assign = Object.assign;

const DF_PAIR = 'USD';
const V_ON_TIME = 'Values on 00:00 GMT';

const _crTitle = (title) => `${title}: ${V_ON_TIME}`;

const _getConversionType = ({ ConversionType }) =>
  ConversionType || {};

const _crSubtitle = (json, value) => {
  const ConversionType= _getConversionType(json)
  , { conversionSymbol, type='' } = ConversionType;
  return `${value}/${conversionSymbol || DF_PAIR} ${type}`;
};

const _crBtTitleTo = (json) => {
  const ConversionType = _getConversionType(json)
  , { conversionSymbol } = ConversionType;
  return `${conversionSymbol || DF_PAIR}`;
};

const _crMiniVolume = (title, dColumn, dVolume) => ({
  btTitle: `Volume ${title}`,
  dColumn, dVolume
});

const trOption = (option, json) => {
  const { value='', title } = option
  _assign(option, {
    itemCaption: title,
    title: _crTitle(title),
    subtitle: _crSubtitle(json, value)
  })
};

const addConfig = (builder, json, option, data) => {
  const _btTitleTo = _crBtTitleTo(json)
  , { value='' } = option
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
