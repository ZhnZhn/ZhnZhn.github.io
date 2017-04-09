import React, { PropTypes, Component } from 'react'
import Big from 'big.js'

import QuandlFn2 from '../../adapters/QuandlFn2'
import DateUtils from '../../utils/DateUtils'
import ArrayUtil from '../../utils/ArrayUtil'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import SpanLabel from '../zhn-span/SpanLabel'
import InputText from '../zhn/InputText'
import SubPanel from './SubPanel'


const STYLE = {
  SUB_PANEL: {
    position: 'absolute',
    top: '32px',
    left: '0px',
    width: 'auto'
  },
  ROW : {
    //width: '230px'
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    //float: 'right',
    paddingLeft: '16px',
    whiteSpace: 'nowrap'
  },
  ROW_INPUT : {
     display: 'block',
     paddingTop: '8px'
  },
  INPUT_TEXT: {
      width: '100px',
      boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

const _fnFindIndex = ArrayUtil.findIndexByProp('x')

class PanelValueMoving extends Component {
  static propTypes = {
    valueMoving: PropTypes.object,
    fnGetChart: PropTypes.func,
    onChangeDateTo: PropTypes.func,
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ])
  }

  _handleEnterDate = (dateTo) => {
    //console.log('handleEnterDate')
    //console.log(dateTo)
    const chart = this.props.fnGetChart()
    , points = chart.series[0].data
    , millisUTC = DateUtils.dmyToUTC(dateTo)
    , index = _fnFindIndex(points, millisUTC);

    let valueTo
    if (index !== -1) {

      valueTo = points[index].y

      //console.log(index);
      //console.log(valueTo);

      const valueMoving = Object.assign(
        {}, this.props.valueMoving,
        QuandlFn2.createValueMoving({
          bNowValue : Big(this.props.valueMoving.value.replace(' ','')),
          bPrevValue: Big(valueTo)
        }),
        { valueTo, dateTo }
      )
      this.props.onChangeDateTo(valueMoving)
    }
  }

  _renderAdmin = (isAdminMode, date)  => {
    if (!isAdminMode) {
      return null;
    } else {
      return (
        <label style={STYLE.ROW_INPUT}>
          <SpanLabel label="CompareTo:" />
          <InputText
            style={STYLE.INPUT_TEXT}
            initValue={date}
            onEnter={this._handleEnterDate}
          />
        </label>
      );
    }
  }

  render(){
    const { valueMoving, isAdminMode } = this.props
        , { value, date, valueTo, dateTo } = valueMoving
        , _isAdminMode = (typeof isAdminMode == 'function')
              ? isAdminMode()
              : ( typeof isAdminMode == 'boolean')
                   ? isAdminMode
                   : false;
    return (
      <SubPanel style={STYLE.SUB_PANEL}>
         <div style={STYLE.ROW}>
           <SpanValue value={value} />
           <SpanDate date={date} style={STYLE.DATE} />
        </div>
        <div style={STYLE.ROW}>
           <SpanValue value={valueTo} />
           <SpanDate date={dateTo} style={STYLE.DATE} />
        </div>
        { this._renderAdmin(_isAdminMode, date)}
      </SubPanel>
    );
  }
}

export default PanelValueMoving
