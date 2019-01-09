import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import SpanLabel from '../zhn-span/SpanLabel'

import DateField from '../zhn/DateField'
import SubPanel from './SubPanel'

const { isDmy } = DateUtils

const S = {
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
  DATE_FIELD: {
    width: '120px',
    marginLeft: '8px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

const RowValueDate = ({ value, date }) => (
  <div style={S.ROW}>
    <SpanValue value={value} />
    <SpanDate date={date} style={S.DATE} />
  </div>
);

class PanelValueMoving extends Component {
  /*
  static propTypes = {
    valueMoving: PropTypes.shape({
      value: PropTypes.string,
      date: PropTypes.string,
      valueTo: PropTypes.string,
      dateTo: PropTypes.string,
      isDenyToChange: PropTypes.bool
    }),
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    msgDateTo: PropTypes.string,
    updateDateTo: PropTypes.func
  }
  */
  state = {
    msgDateTo: ''
  }
  
  componentDidUpdate(prevProps){
    if (this.props !== prevProps) {
      this.setState({ msgDateTo: '' })
    }
  }

  _handleEnterDate = (dateTo) => {
    if (this.dateToComp.isValid()){
      const isUpdated = this.props.updateDateTo(dateTo)
      if (isUpdated){
        this.setState({ msgDateTo: ''})
      } else {
        this.setState({ msgDateTo: `No data for ${dateTo}`})
      }
    }
  }

  _refDateToComp = comp => this.dateToComp = comp

  _renderAdmin = (isAdminMode, date, msgDateTo, isDenyToChange)  => {
    if (!isAdminMode || isDenyToChange) {
      return null;
    } else {
      return (
        <div>
          <label style={S.ROW_INPUT}>
            <SpanLabel label="CompareTo:" />
            <DateField
              ref={this._refDateToComp}
              rootStyle={S.DATE_FIELD}
              initValue={date}
              placeholder="DD-MM-YYYY"
              errorMsg="DD-MM-YYYY"
              onTest={isDmy}
              onEnter={this._handleEnterDate}
            />
          </label>
          <div>
            <span style={S.MSG}>
              {msgDateTo}
            </span>
          </div>
        </div>
      );
    }
  }

  render(){
    const { valueMoving, isAdminMode } = this.props
        , { value, date, valueTo, dateTo, isDenyToChange } = valueMoving
        , _isAdminMode = (typeof isAdminMode == 'function')
              ? isAdminMode()
              : ( typeof isAdminMode == 'boolean')
                   ? isAdminMode
                   : false
       , { msgDateTo } = this.state;
    return (
      <SubPanel style={S.SUB_PANEL}>
        <RowValueDate value={value} date={date} />
        <RowValueDate value={valueTo} date={dateTo} />
        { this._renderAdmin(_isAdminMode, date, msgDateTo, isDenyToChange)}
      </SubPanel>
    );
  }
}

export default PanelValueMoving
