//import PropTypes from 'prop-types'
import { useRef, useContext } from 'react'
import Highcharts from 'highcharts'

import ThemeContext  from '../hoc/ThemeContext'
import safeFn from '../../utils/safeFn'

import D from '../dialogs/DialogCell'
import FlatButton from '../zhn-m/FlatButton'
import RowButtons from './RowButtons'

const S = {
  BT_PROXY: {
    marginRight: 8
  }
};

const UI_THEME_OPTIONS = [
  { caption: 'Dark', value: 'GREY' },
  { caption: 'Light', value: 'WHITE' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'Sand Light', value: 'SAND_L' }
];


const SET_PROXY = 'setProxy'
const MODE_ADMIN = 'isAdminMode';
const MODE_DELTA = 'isDrawDeltaExtrems';
const MODE_ZOOM = 'isNotZoomToMinMax';

const _crHaloOption = (is=false) => ({
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: is
        }
      }
    }
  }
});

const _useProxy = (data) => {
  const _refProxy = useRef()
  , _setProxy = safeFn(data, SET_PROXY)
  , _proxy = data.getProxy();
  return [
    _refProxy,
    _proxy,
    _setProxy,
    () => _setProxy(_refProxy.current.getValue()),
    () => _setProxy('')
  ];
}

const _useTheme = (onChangeTheme) => {
  const theme = useContext(ThemeContext);
  return item => {
     if (item && theme.getThemeName() !== item.value) {
       theme.setThemeName(item.value)
       onChangeTheme(item.value)
     }
  };
};

const PaneOptions = ({
  titleStyle, btStyle,
  data,
  onClose,
  onChangeTheme
}) => {
  const [
    _refProxy,
    _proxy, _setProxy,
    _hSetProxy, _hClearProxy
  ] = _useProxy(data)
  , _hSelectTheme = _useTheme(onChangeTheme)
  , _hMode = (fnName, mode) => safeFn(data, fnName)(mode)
  , _hSetHalo = is => Highcharts.setOptions(_crHaloOption(is));

  const _isAdminMode = safeFn(data, MODE_ADMIN, false)()
  , _isDrawDeltaExtrems = safeFn(data, MODE_DELTA, false)()
  , _isNotZoomToMinMax = safeFn(data, MODE_ZOOM, false)();

  return (
    <div>
      <D.RowPattern
         ref={_refProxy}
         captionStyle={titleStyle}
         caption="Proxy"
         placeholder="Https Proxy Server"
         initValue={_proxy}
         onEnter={_setProxy}
         isClearBlank={true}
         onClear={_hClearProxy}
      />
      <D.RowInputSelect
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
        onCheck={_hSetHalo.bind(null, false)}
        onUnCheck={_hSetHalo.bind(null, true)}
     />
     <RowButtons btStyle={btStyle} onClose={onClose}>
       <FlatButton
         style={{...btStyle, ...S.BT_PROXY}}
         caption="SET PROXY"
         onClick={_hSetProxy}
       />
     </RowButtons>
    </div>
  );
}

/*
PaneOptions.propTypes = {
  titleStyle: PropTypes.object,
  btStyle: PropTypes.object,
  data: PropTypes.object,
  onClose: PropTypes.func,
  onChangeTheme: PropTypes.func
}
*/

export default PaneOptions
