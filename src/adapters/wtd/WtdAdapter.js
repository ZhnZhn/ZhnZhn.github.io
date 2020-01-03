import WtdHistorical from './WtdHistorical'
import WtdIntraday from './WtdIntraday'

const _rAdapter = {
  DF: WtdHistorical,
  intraday: WtdIntraday
};

const _getAdapter = ({ dfType }) => _rAdapter[dfType]
 || _rAdapter.DF;

const WtdAdapter = {
  crKey: (option={}) => _getAdapter(option)
    .crKey(option),

  toConfig: (json, option={}) => _getAdapter(option)
    .toConfig(json, option),

  toSeries: (json, option) => {
    const { config } = WtdAdapter.toConfig(json, option);
    return config.series[0];
  }
};

export default WtdAdapter
