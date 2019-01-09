import React, { Component } from 'react'
import Highcharts from 'highcharts'
//import PropTypes from 'prop-types'

import safeFn from '../../utils/safeFn'

import withTheme from '../hoc/withTheme'

import RowPattern from '../dialogs/RowPattern'
import RowInputSelect from '../dialogs/RowInputSelect'
import RowCheckBox from '../dialogs/RowCheckBox'
import FlatButton from '../zhn-m/FlatButton'
import RowButtons from './RowButtons'

const UI_THEME_OPTIONS = [
  { caption: 'Dark', value: 'GREY' },
  { caption: 'Light', value: 'WHITE' },
  { caption: 'Sand', value: 'SAND' }
];

const SET = {
  PROXY: 'setProxy'
};

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

class PaneOptions extends Component {
  /*
  static propTypes = {
    titleStyle: PropTypes.object,
    btStyle: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  constructor(props){
    super()
    const { data } = props;

    this._setProxy = safeFn(data, SET.PROXY)
  }

  _hMode = (fnName, mode) => {
    const { data } = this.props
        , fnMode = safeFn(data, fnName);
    fnMode(mode)
  }
  _hSetProxy = () => {
    this._setProxy(this.proxyComp.getValue())
  }
  _hSelectTheme = (item) => {
    const { theme, onChangeTheme } = this.props;
    if (
        item &&
        theme.getThemeName() !== item.value
    ) {
      theme.setThemeName(item.value)
      onChangeTheme(item.value)
      //this.forceUpdate()
    }
  }

  _setHalo = (is) => {
    Highcharts.setOptions(_crHaloOption(is))
  }


 _refProxy = n => this.proxyComp = n

  render(){
    const { titleStyle, btStyle, data, onClose } = this.props
        , _proxy = data.getProxy()
        , _isAdminMode = safeFn(data, MODE_ADMIN, false)()
        , _isDrawDeltaExtrems = safeFn(data, MODE_DELTA, false)()
        , _isNotZoomToMinMax = safeFn(data, MODE_ZOOM, false)();
    return (
      <div>
        <RowPattern
           ref={this._refProxy}
           titleStyle={titleStyle}
           title="Https Proxy:"
           placeholder="Https Proxy for CORS"
           initValue={_proxy}
           onEnter={this._setProxy}
        />
        <RowInputSelect
           caption="UI Theme"
           captionStyle={titleStyle}
           options={UI_THEME_OPTIONS}
           onSelect={this._hSelectTheme}
        />
       <RowCheckBox
          initValue={_isAdminMode}
          caption="View in Admin Mode"
          onCheck={this._hMode.bind(null, MODE_ADMIN, true)}
          onUnCheck={this._hMode.bind(null, MODE_ADMIN, false)}
       />
       <RowCheckBox
          initValue={_isDrawDeltaExtrems}
          caption="Draw Delta Extrems"
          onCheck={this._hMode.bind(null, MODE_DELTA, true)}
          onUnCheck={this._hMode.bind(null, MODE_DELTA, false)}
       />
       <RowCheckBox
          initValue={_isNotZoomToMinMax}
          caption="Not Zoom to Min-Max"
          onCheck={this._hMode.bind(null, MODE_ZOOM, true)}
          onUnCheck={this._hMode.bind(null, MODE_ZOOM, false)}
       />
       <RowCheckBox
          initValue={false}
          caption="Without Points Halo"
          onCheck={this._setHalo.bind(null, false)}
          onUnCheck={this._setHalo.bind(null, true)}
       />
       <RowButtons btStyle={btStyle} onClose={onClose}>
         <FlatButton
           caption="SET PROXY"
           isPrimary={true}
           onClick={this._hSetProxy}
         />
       </RowButtons>
      </div>
    );
  }
}

export default withTheme(PaneOptions)
