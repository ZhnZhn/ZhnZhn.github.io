import crRetryableLazy from './crRetryableLazy';

const _getComp = name =>
  module => ({ default: module.default[name] });

const _fLazy = compName => () => import(
  /* webpackChunkName: "sparklines" */
  /* webpackMode: "lazy" */
  '../zhn-sparklines/Sparklines'
  ).then(_getComp(compName))

const Comp = {
  SparkView: crRetryableLazy(_fLazy('SparkView')),
  Line: crRetryableLazy(_fLazy('Line')),
  Bars: crRetryableLazy(_fLazy('Bars')),
  ReferenceLine: crRetryableLazy(_fLazy('ReferenceLine')),
  Spot: crRetryableLazy(_fLazy('Spot')),
  Spots: crRetryableLazy(_fLazy('Spot')),
  MaxLabel: crRetryableLazy(_fLazy('MaxLabel')),
  MinLabel: crRetryableLazy(_fLazy('MinLabel'))
};

export default Comp
