import React, { Component } from 'react';
//import PropTypes from "prop-types";

import ChartTypes from './ChartTypes'
import D from './DialogCell'

const { crOptions } = ChartTypes;
const { Decor, crMenuMore } = D

const ERR_MSG = 'Empty or Id format is not valid';

const S = {
  ID_CAPTION: { width: 85 },
  ID_ROOT: { width: 270 }
};

const _isStrNotBlank = str => typeof str === 'string'
  && str.trim();

const _testId = (value) => {
  if (_isStrNotBlank(value)
   && _isStrNotBlank(value.split('/')[2])) {
    return true;
  }
  return false;
};

@Decor.withToolbar
@Decor.withLoad
class DialogQuery extends Component {
  constructor(props){
    super(props)

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })
    const { noDate } = props;
    this.toolbarButtons = this._createType2WithToolbar(
       props, { noDate }
    )
    this._chartOptions = crOptions({ chartsType: 't2' })
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
       isToolbar: true,
       isShowLabels: true,
       isShowDate: true,
       chartType: 'SPLINE'
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _hSelectChartType = (chartType) => {
    this.setState({ chartType })
  }
  _onRegColor = (comp) => {
    this.colorComp = comp
  }


  _handleLoad = () => {
    if (this._idInput) {
      if (this._idInput.isValid()) {
        const _value = this._idInput.getValue()
        , { props, state, colorComp } = this
        , { onLoad, loadFn } = props
        , { chartType } = state
        , { seriaColor, seriaWidth } = colorComp
            ? colorComp.getConf()
            : {};
        onLoad(loadFn(this.props, {
          one: {
            value: _value,
            caption: _value
          },
          chartType, seriaColor, seriaWidth
        }));
      } else {
        this._idInput.showErrMsg()
      }
    }
  }

  _refIdInput = c => this._idInput = c
  _refDates = c => this.datesFragment = c

  render(){
    const { caption, isShow,
            onShow, onFront, onClose,
            oneCaption, onePlaceholder,
            noDate, initFromDate, initToDate,
            msgOnNotValidFormat, onTestDate
          } = this.props
        , { isToolbar,
            isShowLabels, isShowDate,
            chartType
          } = this.state;
    return (
      <D.DraggableDialog
          isShow={isShow}
          menuModel={this._menuMore}
          caption={caption}
          commandButtons={this._commandButtons}
          onShowChart={onShow}
          onFront={onFront}
          onClose={onClose}
      >
        <D.Toolbar
          isShow={isToolbar}
          buttons={this.toolbarButtons}
        />
        <D.RowPattern
          ref={this._refIdInput}
          isShow={isShow}
          isShowLabels={isShowLabels}
          captionStyle={S.ID_CAPTION}
          rootStyle={S.ID_ROOT}
          placeholder={onePlaceholder}
          caption={oneCaption}
          onTest={_testId}
          errorMsg={ERR_MSG}
        />
        <D.RowChartDate
            chartType={chartType}
            isShowLabels={isShowLabels}
            isShowChart={true}
            labelStyle={S.ID_CAPTION}
            selectWidth={S.ID_ROOT.width}
            chartOptions={this._chartOptions}
            onSelectChart={this._hSelectChartType}
            onRegColor={this._onRegColor}
            noDate={noDate}
          />
        {
          !noDate &&
          <D.ShowHide isShow={isShowDate}>
            <D.DatesFragment
               ref={this._refDates}
               isShowLabels={isShowLabels}
               initFromDate={initFromDate}
               initToDate={initToDate}
               msgOnNotValidFormat={msgOnNotValidFormat}
               onTestDate={onTestDate}
            />
          </D.ShowHide>
        }
     </D.DraggableDialog>
    );
  }
}

export default DialogQuery
