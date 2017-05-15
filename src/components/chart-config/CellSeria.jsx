import React, { Component, PropTypes } from 'react'

import safeGet from '../../utils/safeGet'
import DateUtils from '../../utils/DateUtils'

import OpenClose from '../zhn/OpenClose'
import RowInputText from './RowInputText'
import RowInputColor from './RowInputColor'
import RowCheckBox from '../dialogs/RowCheckBox'

const STYLE = {
  ROW_INPUT: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}

const arrType = ['area', 'areaspline', 'line', 'spline', 'bar', 'column']
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

const _fnFindPoint = (points, dmy) => {
  const mls = DateUtils.dmyToUTC(dmy);
  return points.find(point => {
    return point.x === mls;
  });
}

class CellSeria extends Component {
  static propTypes = {
    chart: PropTypes.object,
    options: PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string,
      marker: PropTypes.shape({
         symbol: PropTypes.string
      })
    }),
    seriaIndex: PropTypes.number
  }

  constructor(props){
    super()
    this._initProps(props)
  }

  _initProps = (props) => {
    const { chart={}, seriaIndex=0 } = props;

    this.seriaIns = safeGet(chart, `series[${seriaIndex}]`, {})
    this.data = safeGet(chart, `series[${seriaIndex}].data`, [])
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      this._initProps(nextProps)
    }
  }

  _handleEnterType = (value) => {
      const { chart } = this.props
          , seriaOptions = this.seriaIns.options;

      if (seriaOptions && chart.addSeries
          && _fnIsInArray(arrType, value) ) {

        seriaOptions.type = value
        this.seriaIns.update(seriaOptions)
        /*
        seria.remove(false);
        chart.addSeries(seriaOptions);
        */
    }
  }
  _handleEnterColor = (value) => {
    const { chart } = this.props
        , seriaOptions = this.seriaIns.options;

    if (seriaOptions && chart.addSeries
        && _fnIsValidColor(value) ) {
      seriaOptions.color = value
      this.seriaIns.update(seriaOptions)
    }
  }
  _handleEnterSymbol = (value) => {
    const { chart } = this.props
        , seriaOptions = this.seriaIns.options;

    if (seriaOptions && chart.addSeries
        && _fnIsInArray(arrSymbol, value)) {
      if (seriaOptions.marker) {
        seriaOptions.marker.symbol = value
      } else {
        seriaOptions.marker = { symbol : value }
      }
      this.seriaIns.update(seriaOptions)
    }
  }
  _handleEnterHover = (value) => {
    const point = _fnFindPoint(this.data, value);
    if (point) {
      point.setState('hover')
    }
  }
  _handleEnterTooltip = (value) => {
    const { chart } = this.props
        , point = _fnFindPoint(this.data, value);
    if (point) {
      chart.zhTooltip.refresh(point)
    }
  }
  _handleEnterCrossX = (value) => {
    const { chart } = this.props
        , point = _fnFindPoint(this.data, value);
    if (point) {
      chart.xAxis[0].drawCrosshair(null, point)
    }
  }
  _handleEnterAxisPt = (value) => {
    const point = _fnFindPoint(this.data, value);
    if (point) {
      point.onMouseOver()
      point.setState('')
    }
  }
  _handleToggleSeria = (isShow) => {
    this.seriaIns.setVisible(isShow)
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
        <RowInputColor
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
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="AxisPt:"
          initValue=""
          onEnter={this._handleEnterAxisPt}
        />
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="HoverPt:"
          initValue=""
          onEnter={this._handleEnterHover}
        />
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="TooltipPt:"
          initValue=""
          onEnter={this._handleEnterTooltip}
        />
        <RowInputText
          styleRoot={STYLE.ROW_INPUT}
          caption="CrossXPt:"
          initValue=""
          onEnter={this._handleEnterCrossX}
        />
        <RowCheckBox
          caption="Toggle Seria"
          onCheck={this._handleToggleSeria.bind(null, false)}
          onUnCheck={this._handleToggleSeria.bind(null, true)}
        />
      </OpenClose>
    )
  }
}

export default CellSeria
