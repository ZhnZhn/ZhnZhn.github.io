import React, { Component } from 'react'

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';

const S = {
  MODAL: {
    position: 'static',
    width: 350,
    height: 190,
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: 16,
    paddingLeft: 16,
    fontWeight: 'bold',
    lineHeight: 1.4
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: 'rgb(35, 47, 59)'
  }
}

class ReloadDialog extends Component {

  constructor(props){
    super(props)
    this._commandButtons = [
      <Button.Flat
        key="reload"
        caption="Yes, Reload"
        isPrimary={true}
        onClick={this._hReload}
      />,
      <Button.Flat
        key="no"
        rootStyle={S.CLOSE}
        caption="No"
        onClick={props.onClose}
      />
    ]
  }

  _hReload = () => {
    document.cookie="erc=1"
    window.location.reload(true)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  render(){
    const { isShow, onClose, data } = this.props
        , { prevDate, nextDate } = data;
    return (
      <ModalDialog
        style={S.MODAL}
        caption="Reload"
        isShow={isShow}
        commandButtons={this._commandButtons}
        withoutClose={true}
        onClose={onClose}
      >
        <div style={S.ROOT}>
          <p>
            You browser open ERC from a cache.
          </p>
          <p style={S.DATE}>
            {prevDate}
          </p>
          <p>
            A new build exists. Is Reload app?
          </p>
          <p style={S.DATE}>
            {nextDate}
          </p>
        </div>
      </ModalDialog>
    );
  }
}

export default ReloadDialog
