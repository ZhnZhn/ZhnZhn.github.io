"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ChartOptionsFn = require("../dialogs/ChartOptionsFn");
var _crDateConfig = _interopRequireDefault(require("../dialogs/fns/crDateConfig"));
var _loadConfigs = _interopRequireDefault(require("./dimensions/loadConfigs"));
var _usePreviousProps = _interopRequireDefault(require("./usePreviousProps"));
const MAP_FREQUENCY_DF = 'M',
  _crOptionItem = (caption, value) => ({
    caption,
    value
  });
const _loadDims = (_ref, _setConfigs) => {
  let {
    dims,
    proxy,
    baseMeta,
    loadId,
    mapFrequency,
    dfProps
  } = _ref;
  (0, _loadConfigs.default)({
    dims,
    proxy,
    baseMeta,
    loadId,
    mapFrequency,
    ...dfProps
  }).then(_setConfigs).catch(err => {
    _setConfigs({
      errMsg: err.message
    });
  });
};
const _crLoadingState = () => ({
  isLoading: true,
  isLoadFailed: false
});
const _useIsLoadDims = (props, isLoadFailed) => {
  const prevProps = (0, _usePreviousProps.default)(props);
  return isLoadFailed && !prevProps.isShow && props.isShow;
};
const _crDateOptions = (configs, _mF, mapDateDf, loadId) => {
  const {
    dateOptions
  } = configs;
  if (dateOptions) {
    return [dateOptions, dateOptions[0]];
  }
  const [_dateOptions, dateDefault] = (0, _crDateConfig.default)(_mF, mapDateDf, loadId);
  return [_dateOptions, _crOptionItem(dateDefault, dateDefault)];
};
const _crSelectOptions = configs => configs.map(config => config.options);
const _crDimOptions = configs => {
  const _dimOptions = [];
  configs.forEach(config => {
    if ((config.options || []).length > 1) {
      _dimOptions.push(_crOptionItem(config.caption, config.id));
    }
  });
  return _dimOptions;
};
const useLoadDims = (props, setValidationMessages) => {
  const {
      chartsType,
      mapFrequency,
      mapDateDf,
      loadId,
      dfProps = {}
    } = props,
    _mapFrequency = dfProps.mapFrequency || mapFrequency || MAP_FREQUENCY_DF,
    _mapDateDf = dfProps.mapDateDf || mapDateDf,
    [{
      isLoading,
      isLoadFailed
    }, setLoad] = (0, _uiApi.useState)(_crLoadingState),
    [state, setState] = (0, _uiApi.useState)(() => ({
      configs: [],
      selectOptions: [],
      mapFrequency,
      chartOptions: (0, _ChartOptionsFn.crDialogChartOptions)(props),
      dateOptions: []
    })),
    _setConfigs = (0, _uiApi.useCallback)(_ref2 => {
      let {
        configs,
        timeId,
        mapFrequency: mF,
        errMsg
      } = _ref2;
      if (configs) {
        const _mF = mF || _mapFrequency,
          [dateOptions, dateDf] = _crDateOptions(configs, _mF, _mapDateDf, loadId);
        setLoad({
          isLoading: false,
          isLoadFailed: false
        });
        setState({
          timeId,
          configs,
          selectOptions: _crSelectOptions(configs),
          mapFrequency: _mF,
          dimOptions: _crDimOptions(configs),
          chartOptions: (0, _ChartOptionsFn.crDialogChartOptions)({
            configs,
            chartsType,
            mapFrequency: _mF
          }),
          dateOptions,
          dateDf
        });
      } else {
        setLoad({
          isLoading: false,
          isLoadFailed: true
        });
        setValidationMessages([errMsg]);
      }
    }, [chartsType, _mapFrequency, _mapDateDf, loadId, setValidationMessages]),
    _isLoadDims = _useIsLoadDims(props, isLoadFailed);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    _loadDims(props, _setConfigs);
  }, []);
  //props, _setConfigs
  /*eslint-enable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_isLoadDims) {
      _loadDims(props, _setConfigs);
      setLoad(_crLoadingState);
    }
  }, [_isLoadDims, props, _setConfigs]);
  return [state, isLoading, isLoadFailed];
};
var _default = useLoadDims;
exports.default = _default;
//# sourceMappingURL=useLoadDims.js.map