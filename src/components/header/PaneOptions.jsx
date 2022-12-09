import {
  useContext,
  useRef
} from '../uiApi';

import ThemeContext  from '../hoc/ThemeContext';

import setChartPointsHalo from '../../charts/setChartPointsHalo';
import getFnByPropName from '../../utils/getFnByPropName';

import D from '../dialogs/DialogCell';
import FlatButton from '../zhn-m/FlatButton';
import RowButtons from './RowButtons';

const S_MR_4 = { marginRight: 4 }
, S_MR_12 = { marginRight: 12 };

const UI_THEME_OPTIONS = [
  { caption: 'Dark', value: 'GREY' },
  { caption: 'Light', value: 'WHITE' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'Sand Light', value: 'SAND_L' }
];

const SET_PROXY = 'setProxy';
const MODE_ADMIN = 'isAdminMode';
const MODE_DELTA = 'isDrawDeltaExtrems';
const MODE_ZOOM = 'isNotZoomToMinMax';

const _useProxy = (data) => {
  const _refProxy = useRef()
  , _setProxy = getFnByPropName(data, SET_PROXY)
  , _proxy = data.getProxy();
  return [
    _refProxy,
    _proxy,
    _setProxy,
    () => {
      const input = _refProxy.current;
      if (!_setProxy(input.getValue())) {
        input.showErrMsg()
      }
    },
    () => _setProxy('')
  ];
}

const _useTheme = (onChangeTheme) => {
  const theme = useContext(ThemeContext);
  return item => {
     const _themeName = (item || {}).value;
     if (_themeName && theme.getThemeName() !== _themeName) {
       theme.setThemeName(_themeName)
       onChangeTheme(_themeName)
     }
  };
};

const _removeChartPointsHalo = setChartPointsHalo.bind(null, false)
, _addChartPointsHalo = setChartPointsHalo.bind(null, true);

const PaneOptions = ({
  isShowLabels,
  titleStyle,
  btStyle,
  data,
  onClose,
  onChangeTheme
}) => {
  const [
    _refProxy,
    _proxy,
    _setProxy,
    _hSetProxy,
    _hClearProxy
  ] = _useProxy(data)
  , _hSelectTheme = _useTheme(onChangeTheme)
  , _hMode = (fnName, mode) => getFnByPropName(data, fnName)(mode)
  , _isAdminMode = getFnByPropName(data, MODE_ADMIN, false)()
  , _isDrawDeltaExtrems = getFnByPropName(data, MODE_DELTA, false)()
  , _isNotZoomToMinMax = getFnByPropName(data, MODE_ZOOM, false)();

  return (
    <div>
      <D.RowPattern
         ref={_refProxy}
         isShowLabels={isShowLabels}
         captionStyle={titleStyle}
         caption="Proxy"
         placeholder="Local Http Proxy Server"
         initValue={_proxy}
         onEnter={_setProxy}
         isClearBlank={true}
         onClear={_hClearProxy}
         errorMsg="Should start with http://127.0.0.1"
      />
      <D.RowInputSelect
         isShowLabels={isShowLabels}
         caption="UI Theme"
         captionStyle={titleStyle}
         options={UI_THEME_OPTIONS}
         onSelect={_hSelectTheme}
      />
     <D.RowCheckBox
        initValue={_isAdminMode}
        caption="View in Admin Mode"
        onCheck={_hMode.bind(null, MODE_ADMIN, true)}
        onUnCheck={_hMode.bind(null, MODE_ADMIN, false)}
     />
     <D.RowCheckBox
        initValue={_isDrawDeltaExtrems}
        caption="Draw Deltas to Min-Max"
        onCheck={_hMode.bind(null, MODE_DELTA, true)}
        onUnCheck={_hMode.bind(null, MODE_DELTA, false)}
     />
     <D.RowCheckBox
        initValue={_isNotZoomToMinMax}
        caption="Not Zoom to Min-Max"
        onCheck={_hMode.bind(null, MODE_ZOOM, true)}
        onUnCheck={_hMode.bind(null, MODE_ZOOM, false)}
     />
     <D.RowCheckBox
        initValue={false}
        caption="Without Points Halo"
        onCheck={_removeChartPointsHalo}
        onUnCheck={_addChartPointsHalo}
     />
     <RowButtons style={S_MR_12} btStyle={btStyle} onClose={onClose}>
       <FlatButton
         style={{...btStyle, ...S_MR_4}}
         caption="SET PROXY"
         onClick={_hSetProxy}
       />
     </RowButtons>
    </div>
  );
}

export default PaneOptions
