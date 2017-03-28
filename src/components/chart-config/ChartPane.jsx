import React, { Component, PropTypes } from 'react'
import safeGet from 'lodash.get'

import RowInputText from './RowInputText'
import RowCheckBox from './RowCheckBox'
import STYLE from './Pane.Style'


const _findPlotLine = function(chart, id){
  const _lines = safeGet(chart, 'options.yAxis[0].plotLines', [])
  return _lines.find(item => item.id === id)
}


class ChartPane extends Component {
  static propTypes = {
    chart : PropTypes.object
  }

  constructor(props){
    super()
    this.hmLines = {}
  }

  _handleEnterTitle = (value) => {
    const chart = safeGet(this.props, 'chart', {})
        , options = chart.options;

    if (options && chart.setTitle){
      const { title={}, subtitle={} } = options
      title.text = value
      chart.setTitle(title, subtitle)
    }

  }
  _handleEnterSubtitle = (value) => {
    const chart = safeGet(this.props, 'chart', {})
        , options = chart.options;

    if (options && chart.setTitle){
      const { title={}, subtitle={} } = options
      subtitle.text = value
      chart.setTitle(title, subtitle)
    }
  }
  _handleEnterHeight = (value) => {
     const { chart={} } = this.props
         , _nValue = parseFloat(value);

     if (!isNaN(_nValue) && isFinite(_nValue)) {
       chart.options.chart.height = _nValue;
       chart.reflow();
       //chart.setSize(undefined, nValue, false)
     }
  }
  /*
  _handleEnterSpacingTop = (value) => {
     const { chart={} } = this.props
     , nValue = parseFloat(value);
     chart.options.chart.spacingTop = nValue;
     chart.redraw();
  }
 **/


  _handleRemovePlotLine = (id) => {
    const chart = safeGet(this.props, 'chart')
        , lineOptions = _findPlotLine(chart, id)
        , yAxis = safeGet(chart, 'yAxis[0]');

    if (lineOptions && yAxis.removePlotLine){
      this.hmLines[id] = lineOptions
      yAxis.removePlotLine(id)
    }
  }
  _handleAddPlotLine = (id) => {
    const chart = safeGet(this.props, 'chart')
        , yAxis = safeGet(chart, 'yAxis[0]');

    if (yAxis && yAxis.addPlotLine){
      yAxis.addPlotLine(this.hmLines[id])
    }
  }

  _handleHideSeriesTitles = () => {
    const _els = safeGet(this.props, 'chart.options.zhSeries.titleEls', []);
    _els.forEach(el => {
       el.css({ display: 'none' })
    })
  }
  _handleShowSeriesTitles = () => {
    const _els = safeGet(this.props, 'chart.options.zhSeries.titleEls', []);
    _els.forEach(el => {
       el.css({ display: 'inline' })
    })
  }


  render(){
    const { chart } = this.props
        , _title = safeGet(chart, 'options.title.text', '')
        , _subtitle = safeGet(chart, 'options.subtitle.text', '')
        , _height = safeGet(chart, 'options.chart.height', '');

    return (
      <div style={STYLE.ROOT}>
        <RowInputText
          caption="Title:"
          initValue={_title}
          onEnter={this._handleEnterTitle}
        />
        <RowInputText
           caption="Subtitle:"
           initValue={_subtitle}
           onEnter={this._handleEnterSubtitle}
        />
        {/*
        <RowInputText
           caption="spaceTop:"
           initValue={''}
           onEnter={this._handleEnterSpacingTop}
        />
        */}
        <RowInputText
           caption="Height:"
           initValue={_height}
           onEnter={this._handleEnterHeight}
        />

        <RowCheckBox
          caption="Hide YAxis Max Plot Line"
          onCheck={this._handleRemovePlotLine.bind(null, 'max')}
          onUnCheck={this._handleAddPlotLine.bind(null, 'max')}
        />
        <RowCheckBox
          caption="Hide YAxis Min Plot Line"
          onCheck={this._handleRemovePlotLine.bind(null, 'min')}
          onUnCheck={this._handleAddPlotLine.bind(null, 'min')}
        />
        <RowCheckBox
          caption="Hide Series Titles"
          onCheck={this._handleHideSeriesTitles}
          onUnCheck={this._handleShowSeriesTitles}
        />
        <div style={STYLE.MSG}>
          *CheckBoxes don't auto update
        </div>
      </div>
    )
  }
}

export default ChartPane
