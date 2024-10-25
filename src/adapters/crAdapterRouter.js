import {
  isCategorySeriaType,
  isTreeMap,
  isBarTreeMap
} from './CategoryFn';
import toOrderBookDf from './toOrderBookDf';

const _isFn = fn => typeof fn === 'function';

const _getCategoryAdapter = (
  toCategoryAdapter,
  toLineAdapter,
  option
) => isCategorySeriaType(option)
  ? toCategoryAdapter
  : toLineAdapter

export const fGetRouteCategory = (
  toCategoryAdapter,
  toLineAdapter
) => (
  option
) => _getCategoryAdapter(
  toCategoryAdapter,
  toLineAdapter,
  option
)

export const fGetRouteTreeMap = (
  toTreeMapAdapter,
  toCategoryAdapter,
  toLineAdapter
) => (
  option
) => isTreeMap(option.seriaType)
  ? _isFn(toTreeMapAdapter)
      ? toTreeMapAdapter(option)
      : toTreeMapAdapter
  : _getCategoryAdapter(
      toCategoryAdapter,
      toLineAdapter,
      option
   )

export const fGetRouteBarTreeMap = (
  toBarTreeMapAdapter,
  toTreeMapAdapter,
  toCategoryAdapter,
  toLineAdapter
) => {
  const _toRouteTreeMap = fGetRouteTreeMap(
    toTreeMapAdapter,
    toCategoryAdapter,
    toLineAdapter
  );
  return option => isBarTreeMap(option.seriaType)
    ? toBarTreeMapAdapter
    : _toRouteTreeMap(option);
}

const _fGetRouteDf = (
  rAdapter
) => (
  option
) => {
  const {
    _pn='dfSubId'
  } = rAdapter
  , routeId = option[_pn];
  return routeId && rAdapter[routeId]
     || rAdapter.DF;
}

const _fGetAdapter = (
  getRoute
) => (
  option
) => {
  const routeAdapter = getRoute(option)
  return _isFn(routeAdapter)
    ? routeAdapter()
    : routeAdapter;
};

export const crAdapterRouter = ({
  rAdapter,
  getRoute,
  isKey,
  crDfKey
}) => {
  const _getRoute = getRoute || _fGetRouteDf(rAdapter)
  , _getAdapter = _fGetAdapter(_getRoute);
  const _adapter = {
    crKey: isKey || crDfKey
      ? (option) => {
          const _crKey = _getAdapter(option).crKey
            || crDfKey;
          return _isFn(_crKey)
            ? _crKey(option)
            : void 0;
        }
      : void 0,

    toConfig: (json, option) => _getAdapter(option)
      .toConfig(json, option),

    isAdd: (option) => _isFn(_getAdapter(option).toSeries),

    toSeries: (json, option, chart) => _getAdapter(option)
      .toSeries(json, option, chart)
   };
   return _adapter;
}

export const crAdapterRouterDfOb = (
  toKline,
  toOrderBook
) => crAdapterRouter({
  rAdapter: {
    DF: toKline,
    OB: toOrderBook || toOrderBookDf
  }
})
