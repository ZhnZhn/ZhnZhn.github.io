import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import SpanLabel from '../zhn-span/SpanLabel'

import DateField from '../zhn/DateField'
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
  DATE_FIELD: {
    width: '120px',
    marginLeft: '8px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }

}

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

  constructor(props){
    super()
    this.state = {
      msgDateTo: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
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

  _renderAdmin = (isAdminMode, date, msgDateTo, isDenyToChange)  => {
    if (!isAdminMode || isDenyToChange) {
      return null;
    } else {
      return (
        <div>
          <label style={STYLE.ROW_INPUT}>
            <SpanLabel label="CompareTo:" />
            <DateField
              ref={comp => this.dateToComp = comp }
              rootStyle={STYLE.DATE_FIELD}
              initValue={date}
              placeholder="DD-MM-YYYY"
              errorMsg="DD-MM-YYYY"
              onTest={DateUtils.isFormatDmy}
              onEnter={this._handleEnterDate}
            />
          </label>
          <div>
            <span style={STYLE.MSG}>
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
      <SubPanel style={STYLE.SUB_PANEL}>
         <div style={STYLE.ROW}>
           <SpanValue value={value} />
           <SpanDate date={date} style={STYLE.DATE} />
        </div>
        <div style={STYLE.ROW}>
           <SpanValue value={valueTo} />
           <SpanDate date={dateTo} style={STYLE.DATE} />
        </div>
        { this._renderAdmin(_isAdminMode, date, msgDateTo, isDenyToChange)}
      </SubPanel>
    );
  }
}

export default PanelValueMoving
