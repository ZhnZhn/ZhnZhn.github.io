import React, { Component, PropTypes } from 'react'
import safeGet from 'lodash.get'

import OpenClose from '../zhn/OpenClose'
import RowInputText from './RowInputText'

const STYLE = {
  ROW_INPUT: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}

const arrType = ['area', 'areaspline', 'line', 'spline', 'bar']
const arrSymbol = ['circle', 'square', 'diamond', 'triangle', 'triangle-down']

const _fnIsInArray = (arr, value) => {
  return ( arr.indexOf(value) !== -1 ) ? true : false ;
}

const _fnIsValidColor = (color) => {
  const el = document.createElement('div')
  el.style.color = color
  //el.style.color.split(/\s+/).join('').toLowerCase()
  return (el.style.color) ? true : false;
}


class CellSeria extends Component {
  static propTypes = {
    chart: PropTypes.object,
    options: PropTypes.shape({
      type: PropTypes.string
    }),
    seriaIndex: PropTypes.number
  }

  _handleEnterType = (value) => {
      const { chart={}, seriaIndex=0, options={} } = this.props
          , { color } = options
          , _color = (color) ? color : '#7cb5ec'
          , seria = safeGet(chart, `series[${seriaIndex}]`, {})
          , seriaOptions = seria.options;

      if (seriaOptions && chart.addSeries &&
          _fnIsInArray(arrType, value) ) {
        seriaOptions.type = value
        seriaOptions.color = _color
        if (seriaOptions.marker) {
          seriaOptions.marker.symbol = 'circle'
        } else {
          seriaOptions.marker = { symbol : 'circle'}
        }
       seria.update(seriaOptions)
               
        /*
        seria.remove(false);
        chart.addSeries(seriaOptions);
        */
    }
  }
  _handleEnterColor = (value) => {
    const { chart={}, seriaIndex=0 } = this.props
        , seria = safeGet(chart, `series[${seriaIndex}]`, {})
        , seriaOptions = seria.options;

    if (seriaOptions && chart.addSeries
        && _fnIsValidColor(value) ) {
      seriaOptions.color = value
      seria.update(seriaOptions)
    }
  }
  _handleEnterSymbol = (value) => {
    const { chart={}, seriaIndex=0 } = this.props
        , seria = safeGet(chart, `series[${seriaIndex}]`, {})
        , seriaOptions = seria.options;

    if (seriaOptions && chart.addSeries
        && _fnIsInArray(arrSymbol, value)) {
      if (seriaOptions.marker) {
        seriaOptions.marker.symbol = value
      } else {
        seriaOptions.marker = { symbol : value }
      }
      seria.update(seriaOptions)
    }

  }

  render(){
    const { options } = this.props
    , { name, type, color, symbol } = options;
    return (
      <OpenClose caption={name} isClose={true}>
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="Type:"
          initValue={type}
          onEnter={this._handleEnterType}
        />
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="Color:"
          initValue={color}
          onEnter={this._handleEnterColor}
        />
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="Symbol:"
          initValue={symbol}
          onEnter={this._handleEnterSymbol}
        />
      </OpenClose>
    )
  }
}

export default CellSeria
