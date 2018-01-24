import toHdConfig from './toHdConfig'
import toInfoConfig from './toInfoConfig'

const _rAdapter = {
  DF: toHdConfig,
  HD: toHdConfig,
  CI: toInfoConfig
};

const _getAdapter = (option) => {
  const { dfSubLoadId } = option;
  return _rAdapter[dfSubLoadId] || _rAdapter.DF;
};

const CrcAdapter = {
  toConfig(json, option){
    return _getAdapter(option)
      .toConfig(json, option);
  },

  toSeries(json, option){
    return _getAdapter(option)
      .toSeries(json, option);
  }
}

export default CrcAdapter
