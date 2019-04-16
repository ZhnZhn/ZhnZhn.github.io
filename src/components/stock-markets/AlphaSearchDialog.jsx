import React, { Component } from 'react'

import Adapter from '../../adapters/alpha/Adapter'

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'
import crMenuMore from '../dialogs/MenuMore'

@Decor.withToolbar
class AlphaIntradayDialog extends Component {

  constructor(props){
    super(props)


    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true }
    )

    this._searchApi = {
      ...Adapter.Search,
      crUrlOptions: this._crUrlOptions,
      onError: this.props.onError
    }

    this.state = {
      isToolbar: true,
      isShowLabels: true
    }
  }

  _crUrlOptions = () => {
    const { getKey, loadId, onError } = this.props;
    const apiKey = getKey(loadId);
    if (!apiKey) {
      onError('API key from Alpha Vantage is required.', 'Without API Key')
      return void 0;
    }
    return { apiKey };
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleClose = () => {
    this.props.onClose();
  }

  render() {
    const {
      isShow, caption,
      onFront,
    } = this.props
    , {
      isToolbar,
      isShowLabels
    } = this.state;

    return (
      <D.DraggableDialog
           isShow={isShow}
           caption={caption}
           menuModel={this._menuMore}
           onFront={onFront}
           onClose={this._handleClose}
       >
         <D.Toolbar
            isShow={isToolbar}
            buttons={this.toolbarButtons}
         />
         <D.RowInputSearch
           isShowLabels={isShowLabels}
           caption="Token"
           searchApi={this._searchApi}
         />
      </D.DraggableDialog>
    );
  }
}

export default AlphaIntradayDialog
