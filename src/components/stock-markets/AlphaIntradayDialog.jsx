import React, { Component } from 'react'

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'
import crMenuMore from '../dialogs/MenuMore'

const DAILY = 'DAILY';
const D_ADJ = 'DAILY_ADJUSTED';

const _isDaily = dfT => dfT.indexOf(DAILY) !== -1;
const _isDailyAdj = dfT => dfT === D_ADJ;

const DF = {
  INTERVAL: '15min',
  PERIOD: 'compact'
};

const _testTicket = value => Boolean((''+value).trim());

const _intervalOptions = [
  { caption: '1 min', value: '1min' },
  { caption: '5 min', value: '5min' },
  { caption: '15 min', value: '15min' },
  { caption: '30 min', value: '30min' },
  { caption: '60 min', value: '60min' }
]

const _periodOptions = [
  { caption: 'Compact (100 days)', value: 'compact' },
  { caption: 'Full (of 20+ years, about 1MB)', value: 'full' },
];

const _r = {
  INTRADAY: {
    caption: "Interval",
    placeholder: "Default: 15min",
    options: _intervalOptions
  },
  DAILY: {
    caption: "Period",
    placeholder: "Default: Compact",
    options: _periodOptions
  }
}

const _rDaily = {
  DAILY: {
    indicator: 'TIME_SERIES_DAILY',
    interval: 'Daily'
  },
  DAILY_ADJUSTED: {
    indicator: 'TIME_SERIES_DAILY_ADJUSTED',
    interval: 'Daily'
    //interval: 'Daily Adjusted'
  }
};

const _getConf = (key) => _r[key] || _r.DAILY;


const _getInterval = (input, df) => input
  ? input.value
  : df;
const _crLoadOptions = (key, input) => {
  if (key === 'INTRADAY') {
   return {
     indicator: 'TIME_SERIES_INTRADAY',
     interval: _getInterval(input, DF.INTERVAL),
     dfT: key
    };
  }
  const _conf = _rDaily[key] || _rDaily.DAILY;
  return {
     ..._conf,
     outputsize: _getInterval(input, DF.PERIOD),
     dfT: key,
   };
}


@Decor.withToolbar
@Decor.withLoad
@Decor.withInitialState
class AlphaIntradayDialog extends Component {

  constructor(props){
    super(props)

    const { dfT } = props
    this._isDaily = _isDaily(dfT)
    this._isDailyAdj = _isDailyAdj(dfT)
    this._hasDividend = false
    this._hasFilterZero = false

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true, isToggleOptions: this._isDaily }
    )
    this._commandButtons = this._crCommandsWithLoad(this)

    this.state = {
      ...this._isWithInitialState(),
      isToggleOptions: false
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

  _handleSelectInterval = (item) => {
     this.interval = item;
  }

  _handleLoad = () => {
    const { dfT, dataSource, loadId } = this.props
    , _ticket = this.ticketComp.isValid()
        ? this.ticketComp.getValue()
        : undefined
    , _options = _crLoadOptions(dfT, this.interval)
    , _value = `${_ticket || ''} (${_options.interval})`;

    this.props.onLoad({
      loadId,
      ..._options,
      ticket: _ticket,
      value: _value, //for label
      hasDividend: this._hasDividend,
      hasFilterZero: this._hasFilterZero,
      dataSource
    })
  }

  _toggleDividend = () => {
    this._hasDividend = !this._hasDividend
  }
  _toggleFilterZero = () => {
    this._hasFilterZero = !this._hasFilterZero
  }

  _handleClose = () => {
    this.props.onClose();
  }

  _refTicket = (comp) => {
    this.ticketComp = comp
  }


  render() {
    const {
      isShow, caption,
      onShow, onFront,
      dfT
    } = this.props
    , {
      isToolbar,
      isShowLabels,
      isToggleOptions
    } = this.state;

    return (
      <D.DraggableDialog
           isShow={isShow}
           caption={caption}
           menuModel={this._menuMore}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onFront={onFront}
           onClose={this._handleClose}
       >
           <D.Toolbar
              isShow={isToolbar}
              buttons={this.toolbarButtons}
           />
          <D.RowPattern
            ref={this._refTicket}
            isShowLabels={isShowLabels}
            caption="Ticket"
            placeholder="Nyse or Nasdaq Ticket"
            onTest={_testTicket}
            errorMsg="Not Empty"
          />
          <D.RowInputSelect
            isShowLabels={isShowLabels}
            { ..._getConf(dfT)}
            //caption="Interval"
            //placeholder="Default: 15min"
            //options={_intervalOptions}
            onSelect={this._handleSelectInterval}
          />
          {this._isDaily && <D.ShowHide isShow={isToggleOptions}>
              { this._isDailyAdj && <D.RowCheckBox
                  initValue={false}
                  caption={"With Dividend History"}
                  onToggle={this._toggleDividend}
                />
              }
              <D.RowCheckBox
                initValue={false}
                caption={"Filter Zero Values"}
                onToggle={this._toggleFilterZero}
              />
           </D.ShowHide>
         }
      </D.DraggableDialog>
    );
  }
}

export default AlphaIntradayDialog
