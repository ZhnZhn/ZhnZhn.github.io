import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils'
import formatAllNumber from '../../utils/formatAllNumber'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import DivCompareTo from '../modals/DivCompareTo'

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
  _refInput = React.createRef()

  componentDidUpdate(prevProps){
    if (this.props.isShow && this._refInput.current) {
      this._refInput.current.focusInput()
    }
    if (this.props !== prevProps) {
      this.setState({ msgDateTo: '' })
    }
  }

  _handleEnterDate = (dateTo) => {
    if (isDmy(dateTo)){
      const isUpdated = this.props.updateDateTo(dateTo)
      if (isUpdated){
        this.setState({ msgDateTo: ''})
      } else {
        this.setState({ msgDateTo: `No data for ${dateTo}`})
      }
    }
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
        { !_isNotAdminMode(isAdminMode, isDenyToChange)
          && <DivCompareTo
           ref={this._refInput}
           initialValue={dateTo}
           msgErr={msgDateTo}
           onTest={isDmy}
           onEnter={this._handleEnterDate}
        />}
      </ModalPopup>
    );
  }
}

export default ModalValueMoving
