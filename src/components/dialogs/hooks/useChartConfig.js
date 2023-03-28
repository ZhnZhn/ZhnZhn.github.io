import {
  useState,
  useMemo
} from '../../uiApi';

import crDateConfig from '../fns/crDateConfig'
import { crChartOptions } from '../ChartOptionsFn';

const DF_MAP_FREQUENCY = 'EMPTY';

const _getChartConfigFromItem = (
  item,
  mapFrequency,
  mapDateDf
) => [
  item.mapFrequency || mapFrequency,
  item.mapDateDf || mapDateDf
];

const _isRequireUpdateChartConfig = (
 prevState,
 mapFrequency,
 mapDateDf
) => prevState._mapFrequency !== mapFrequency
 || prevState._mapDateDf !== mapDateDf;

// [chartOptions, dateDefault, dateOptions, setChartConfigFromItem]
const useChartConfig = (
  selectProps,
  chartsType,
  loadId,
  dfProps,
  onUpdateChartConfig
) => {
  const {
    mapFrequency=DF_MAP_FREQUENCY,
    mapDateDf
  } = dfProps || {}
  , [
    chartConfig,
    setChartConfig
  ] = useState({
    _mapFrequency: mapFrequency,
    _mapDateDf: mapDateDf,
  })
  , {
    _mapFrequency,
    _mapDateDf
  } = chartConfig;

  return [
    ...useMemo(() => [
      crChartOptions(selectProps, chartsType, _mapFrequency),
      ...crDateConfig(_mapFrequency, _mapDateDf, loadId)
    ], [_mapFrequency, _mapDateDf, selectProps, chartsType, loadId]),
    /*eslint-disable react-hooks/exhaustive-deps */
    useMemo(() => (item) => {
      const [
        _mapFrequency,
        _mapDateDf
      ] = _getChartConfigFromItem(
        item,
        mapFrequency,
        mapDateDf
      );
      setChartConfig(prevState => _isRequireUpdateChartConfig(
            prevState,
            _mapFrequency,
            _mapDateDf
          )
        ? (onUpdateChartConfig(), {
            _mapFrequency,
            _mapDateDf
          })
        : prevState
      )
    }, [])
    // mapFrequency, mapDateDf, onUpdateChartConfig
    /*eslint-enable react-hooks/exhaustive-deps */
  ];
};

export default useChartConfig
