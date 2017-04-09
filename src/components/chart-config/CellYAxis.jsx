import React, { Component, PropTypes } from 'react'

import safeGet from '../../utils/safeGet'

import OpenClose from '../zhn/OpenClose'
import RowInputText from './RowInputText'
import RowCheckBox from '../dialogs/RowCheckBox'

const STYLE = {
  ROW_INPUT: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  CAPTION: {
    width: '120px'
  },
  INPUT: {
    width: '210px'
  }
}

class CellYAxis extends Component {
  static propTypes = {
    chart: PropTypes.object,
    options: PropTypes.shape({
      maxPadding: PropTypes.number,
      min: PropTypes.number,
      minPadding: PropTypes.number,
      tickPixelInterval: PropTypes.number,
      startOnTick: PropTypes.bool
    }),
    axisIndex: PropTypes.number
  }


 _getYAxisIns = () => {
   const { chart={}, axisIndex=0 } = this.props;
   return this.yAxisIns = safeGet(chart, `yAxis[${axisIndex}]`, { update: () => {} })
 }

  _handleEnterNumber = (propName, value) => {
     const _nValue = parseFloat(value)
     if (!isNaN(_nValue) && isFinite(_nValue)) {
       this._getYAxisIns()
           .update({ [propName] : _nValue })
     }
  }
  _handleEnterBool = (propName, value) => {
     this._getYAxisIns()
         .update({ [propName] : value })
  }

  render(){
    const { axisIndex, options } = this.props
         , {
             maxPadding='', min='', minPadding='',
             tickPixelInterval, startOnTick
           } = options;

    //console.log(options);

    return (
      <OpenClose caption={`YAxis ${axisIndex}`}>
         <RowInputText
            styleRoot={STYLE.ROW_INPUT}
            styleCaption={STYLE.CAPTION}
            styleInput={STYLE.INPUT}
            caption="maxPadding:"
            initValue={maxPadding}
            onEnter={this._handleEnterNumber.bind(null, 'maxPadding')}
         />
         <RowInputText
            styleRoot={STYLE.ROW_INPUT}
            styleCaption={STYLE.CAPTION}
            styleInput={STYLE.INPUT}
            caption="min:"
            initValue={min}
            onEnter={this._handleEnterNumber.bind(null, 'min')}
         />
         <RowInputText
            styleRoot={STYLE.ROW_INPUT}
            styleCaption={STYLE.CAPTION}
            styleInput={STYLE.INPUT}
            caption="minPadding:"
            initValue={minPadding}
            onEnter={this._handleEnterNumber.bind(null, 'mixPadding')}
         />
         <RowInputText
            styleRoot={STYLE.ROW_INPUT}
            styleCaption={STYLE.CAPTION}
            styleInput={STYLE.INPUT}
            caption="tickInterval:"
            initValue={tickPixelInterval}
            onEnter={this._handleEnterNumber.bind(null, 'tickPixelInterval')}
         />
         <RowCheckBox
           caption="Start on Tick"
           isChecked={startOnTick}
           onCheck={this._handleEnterBool.bind(null, 'startOnTick', true)}
           onUnCheck={this._handleEnterBool.bind(null, 'startOnTick', false)}
         />
      </OpenClose>
    );
  }
}

export default CellYAxis
