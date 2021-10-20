"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ChartTypes = _interopRequireDefault(require("../dialogs/ChartTypes"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _loadConfigs = _interopRequireDefault(require("./loadConfigs"));

var _usePreviousProps = _interopRequireDefault(require("./usePreviousProps"));

const {
  crOptions
} = _ChartTypes.default,
      {
  crDateConfig
} = _DialogCell.default,
      MAP_FREQUENCY_DF = 'M';

const _loadDims = ({
  dims,
  proxy,
  baseMeta,
  dfProps
}, _setConfigs) => {
  (0, _loadConfigs.default)({
    dims,
    proxy,
    baseMeta,
    ...dfProps
  }).then(_setConfigs).catch(err => {
    _setConfigs({
      errMsg: err.message
    });
  });
};

const _crLoadState = () => ({
  isLoading: true,
  isLoadFailed: false
});

const _useIsLoadDims = (props, isLoadFailed) => {
  const prevProps = (0, _usePreviousProps.default)(props);
  return isLoadFailed && !prevProps.isShow && props.isShow;
};

const _crDateOptions = (configs, _mF, mapDateDf) => {
  const {
    dateOptions
  } = configs;

  if (dateOptions) {
    return [dateOptions, dateOptions[0]];
  }

  const {
    dateOptions: dO,
    dateDefault
  } = crDateConfig(_mF, mapDateDf);
  return [dO, {
    caption: dateDefault,
    value: dateDefault
  }];
};

const _crSelectOptions = configs => configs.map(config => config.options);

const _crDimOptions = configs => configs.map(config => ({
  caption: config.caption,
  value: config.id
}));

const useLoadDims = props => {
  const {
    chartsType,
    mapFrequency = MAP_FREQUENCY_DF,
    mapDateDf
  } = props;

  const [{
    isLoading,
    isLoadFailed
  }, setLoad] = (0, _react.useState)(_crLoadState),
        [validationMessages, setValidationMessages] = (0, _react.useState)([]),
        [state, setState] = (0, _react.useState)(() => ({
    configs: [],
    selectOptions: [],
    mapFrequency,
    chartOptions: crOptions(props),
    dateOptions: []
  })),
        _setConfigs = (0, _react.useCallback)(({
    configs,
    timeId,
    mapFrequency: mF,
    errMsg
  }) => {
    if (configs) {
      const _mF = mF || mapFrequency,
            [dateOptions, dateDf] = _crDateOptions(configs, _mF, mapDateDf);

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
        chartOptions: crOptions({
          configs,
          chartsType
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
  }, [chartsType, mapFrequency, mapDateDf]),
        _isLoadDims = _useIsLoadDims(props, isLoadFailed);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    _loadDims(props, _setConfigs);
  }, []); //props, _setConfigs

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(() => {
    if (_isLoadDims) {
      _loadDims(props, _setConfigs);

      setLoad(_crLoadState);
    }
  }, [_isLoadDims, props, _setConfigs]);
  return [state, isLoading, isLoadFailed, validationMessages, setValidationMessages, setState];
};

var _default = useLoadDims;
exports.default = _default;
//# sourceMappingURL=useLoadDims.js.map