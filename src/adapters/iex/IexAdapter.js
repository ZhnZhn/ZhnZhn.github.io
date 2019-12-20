
import AdapterFn from '../AdapterFn'
import Router from './RouterAdapter'

const _isFn = fn => typeof fn === 'function';

const _crDfKey = ({ one='', two='' }) => one + '_' + two;

const IexAdapter = {
  crKey(option){
    const _adapter = Router.getAdapter(option);
    return _isFn(_adapter.crKey)
      ? _adapter.crKey(option)
      : _crDfKey(option);
  },

  toConfig(json, option){
    const config = Router
      .getAdapter(option)
      .toConfig(json, option);
    return { config };
  },

  toSeries(json, option, chart){
    const _adapter = Router.getAdapter(option);
    AdapterFn.throwIfSeriesNotSupported(_adapter)
    return _adapter.toSeries(json, option, chart);
  }
};

export default IexAdapter
