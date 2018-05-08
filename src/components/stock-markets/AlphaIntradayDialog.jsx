import React, { Component } from 'react'

import D from '../dialogs/DialogCell'
import withToolbar from '../dialogs/decorators/withToolbar'
import crMenuMore from '../dialogs/MenuMore'

const DF = {
  INTERVAL: '15min',
};

const _testTicket = (value) => {
  if (String(value).trim() === '') {
    return false;
  } else {
    return true;
  }
}

const _intervalOptions = [
  { caption: '1 min', value: '1min' },
  { caption: '5 min', value: '5min' },
  { caption: '15 min', value: '15min' },
  { caption: '30 min', value: '30min' },
  { caption: '60 min', value: '60min' }
]

@withToolbar
class AlphaIntradayDialog extends Component {

  constructor(props){
    super()

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true }
    )
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      isToolbar: true,
      isShowLabels: true
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
    const

         _ticket = (this.ticketComp.isValid())
             ? this.ticketComp.getValue()
             : undefined
        , _interval = (this.interval)
             ? this.interval.value
             : DF.INTERVAL
        , _value = `${_ticket} (${_interval})`;
    const option = {
      loadId: 'AL_I',
      indicator: 'TIME_SERIES_INTRADAY',
      interval: _interval,
      ticket: _ticket,
      value: _value, //for label
    }
    this.props.onLoad(option)
  }

  _handleClose = () => {
    //this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  _refTicket = (comp) => {
    this.ticketComp = comp
  }


  render() {
    const {
            isShow, caption,
            onShow, onFront
          } = this.props
        , {
            isToolbar,
            isShowLabels
          } = this.state ;

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
            title="Ticket"
            placeholder="Nyse or Nasdaq Ticket"
            onTest={_testTicket}
            errorMsg="Not Empty"
          />
          <D.RowInputSelect
            isShowLabels={isShowLabels}
            caption="Interval"
            placeholder="Default: 15min"
            options={_intervalOptions}
            onSelect={this._handleSelectInterval}
          />
      </D.DraggableDialog>
    );
  }
}

export default AlphaIntradayDialog
