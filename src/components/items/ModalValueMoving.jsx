import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils'
import formatAllNumber from '../../utils/formatAllNumber'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import SpanLabel from '../zhn-span/SpanLabel'
import DateField from '../zhn/DateField'

const { isDmy } = DateUtils;

const S = {
  ROOT: {
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex : 10,
    width: 'auto',

    backgroundColor: 'inherit',
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
    cursor: 'auto'
  },
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  },
  ROW_INPUT : {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8
  },
  DATE_FIELD: {
    width: 120,
    marginLeft: 8,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  MSG: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

const _isNotAdminMode = (isAdminMode, isDenyToChange) => {
  const _isAdminMode = typeof isAdminMode == 'function'
    ? isAdminMode()
    : typeof isAdminMode == 'boolean'
        ? isAdminMode
        : false;
  return !_isAdminMode || isDenyToChange;
};

const RowValueDate = ({ value, date }) => (
  <div style={S.ROW}>
    <SpanValue value={formatAllNumber(value)} />
    <SpanDate date={date} style={S.DATE} />
  </div>
);

class ModalValueMoving extends Component {
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

  _renderAdmin = (date, msgDateTo) => {
    return (
     <div>
      {/* eslint-disable jsx-a11y/label-has-associated-control */ }
      <label style={S.ROW_INPUT} >
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
      {/* eslint-enable jsx-a11y/label-has-associated-control */ }
      <div>
        <span style={S.MSG}>
          {msgDateTo}
        </span>
      </div>
    </div>
   );
  }

  render(){
    const {
      isShow, onClose,
      valueMoving, isAdminMode
    } = this.props
    , {
      value, date,
      valueTo, dateTo,
      isDenyToChange
    } = valueMoving
    , { msgDateTo } = this.state;
    return (
      <ModalPopup
        isShow={isShow}
        style={S.ROOT}
        onClose={onClose}
      >
        <RowValueDate value={value} date={date} />
        <RowValueDate value={valueTo} date={dateTo} />
        { _isNotAdminMode(isAdminMode, isDenyToChange)
           ? null
           : this._renderAdmin(date, msgDateTo)
         }
      </ModalPopup>
    );
  }
}

export default ModalValueMoving
