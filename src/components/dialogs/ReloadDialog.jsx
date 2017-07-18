import React, { Component } from 'react'

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';

const S = {
  MODAL: {
    position: 'static',
    width: '350px',
    height: '190px',
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: '16px',
    paddingLeft: '16px',
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
    super()
    this._handleReload = this._handleReload.bind(this)
    this._commandButtons = [
      <Button.Flat
        caption="Yes, Reload"
        //accessKey="r"
        isPrimary={true}
        onClick={this._handleReload}
      />,
      <Button.Flat
        rootStyle={S.CLOSE}
        caption="No"
        //accessKey="n"
        onClick={props.onClose}
      />
    ]
  }

  _handleReload(){
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
        , { prevDate, nextDate} = data;
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
            A new build exists. Is Reload App?
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
