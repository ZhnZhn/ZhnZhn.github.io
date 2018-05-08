import React, { Component } from 'react'

import D from '../dialogs/DialogCell'
import withToolbar from '../dialogs/decorators/withToolbar'
import crMenuMore from '../dialogs/MenuMore'

const S = {
  ROW_TEXT: {
    paddingRight: '16px'
  }
};

@withToolbar
class AlphaIndicatorDialog extends Component {

  constructor(props){
    super()

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true, noLabels: true }
    )
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];

    this.state = {
      isToolbar: true
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

  _handleLoad = () => {
    const { loadId, onLoad } = this.props;
    const option = {
      loadId: loadId,
      indicator: 'SECTOR',
      //value: _value, //for label
    };
    onLoad(option)
  }

  _handleClose = () => {
    this.props.onClose()
  }

  render() {
    const {
            isShow, caption,
            onShow, onFront
          } = this.props
        , { isToolbar } = this.state;

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
           <D.Row.Text
             styleRoot={S.ROW_TEXT}
             caption="Alpha:"
             text="Performance by Sector"
           />
      </D.DraggableDialog>
    );
  }
}

export default AlphaIndicatorDialog
