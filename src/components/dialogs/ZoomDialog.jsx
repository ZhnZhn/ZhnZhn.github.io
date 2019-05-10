import React, { Component } from 'react'

import dt from '../../utils/DateUtils'

import ModalDialog from '../zhn-moleculs/ModalDialog';
import D from './DialogCell';

const S = {
  DIALOG: {
    width: 244,
    marginLeft: -122
  },
  DATE: {
    width: 120
  }
};

const _isPeriodValid = (from, to) => dt.dmyToUTC(from)<=dt.dmyToUTC(to);
const _isFn = fn => typeof fn === 'function';

class ZoomDialog extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    data: {}
  }

  constructor(){
    super()

    this._commandButtons = [
      <D.Button.Flat
         key="zoom"
         caption="Zoom"
         isPrimary={true}
         onClick={this._hZoom}
      />
    ]
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props
      && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _hZoom = () => {
    const { data, onClose } = this.props
    , { chart={} } = data;    
    if ( _isFn(chart.zhZoomX)
         && this._dates.getValidation().isValid ) {
      const { fromDate, toDate } = this._dates.getValues()
      chart.zhZoomX({
        from: dt.dmyToUTC(fromDate),
        to: dt.dmyToUTC(toDate)
      })
    }
    onClose()
  }

  _refDates = c => this._dates = c

  render(){
    const {
      isShow,
      data,
      onClose
    } = this.props
    , { chart={} } = data
    , { from, to } = _isFn(chart.zhGetFromToDates)
        ? chart.zhGetFromToDates({
            format: dt.formatTo
          })
        : {}
    , id = _isFn(chart.zhGetId)
       ? chart.zhGetId()
       : void 0;

    return (
      <ModalDialog
        caption="Zoom Chart"
        style={S.DIALOG}
        isShow={isShow}
        commandButtons={this._commandButtons}
        onClose={onClose}
      >
        <D.DatesFragment
           key={id}
           ref={this._refDates}
           dateStyle={S.DATE}
           placeholder="DD-MM-YYYY"
           initFromDate={from}
           initToDate={to}
           errMsg="DD-MM-YYYY format must be, min 01-01-1990"
           isPeriodValid={_isPeriodValid}
           onTestDate={dt.isDmy}
           onEnter={this._hZoom}
        />
      </ModalDialog>
    );
  }
}

export default ZoomDialog
