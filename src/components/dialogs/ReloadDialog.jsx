import React, { Component } from 'react'

import Button from './Button'
import ModalDialog from '../zhn-moleculs/ModalDialog';

const S = {
  MODAL: {
    position: 'static',
    width: 350,
    height: 175,
    margin: '70px auto'
  },
  ROOT: {
    color: 'gray',
    paddingTop: 8,
    paddingLeft: 16,
    lineHeight: 1.7,
    fontWeight: 'bold'
  },
  DATE: {
    color: '#80c040'
  },
  CLOSE: {
    color: '#232f3b'
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
        , { buildDate='' } = data;
    return (
      <ModalDialog
        style={S.MODAL}
        caption="Reload Web App"
        isShow={isShow}
        commandButtons={this._commandButtons}
        withoutClose={true}
        onClose={onClose}
      >
        <div style={S.ROOT}>
          <p>
            Browser has loaded ERC from a cache.
          </p>
          <p>
            Reload web app ERC to the new build?
          </p>
          <p style={S.DATE}>
            {`New build ${buildDate} is available.`}
          </p>
        </div>
      </ModalDialog>
    );
  }
}

export default ReloadDialog
