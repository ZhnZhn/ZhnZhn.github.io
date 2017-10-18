import React, { Component } from 'react'

import D from '../dialogs/DialogCell'
import withToolbar from '../dialogs/decorators/withToolbar'

const S = {
  ROW_TEXT: {
    paddingRight: '16px'
  }
};

@withToolbar
class AlphaIndicatorDialog extends Component {

  constructor(props){
    super()
    this.toolbarButtons = this._createType2WithToolbar(props, true)
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
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
          } = this.props;

    return (
      <D.DraggableDialog
           caption={caption}
           isShow={isShow}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onFront={onFront}
           onClose={this._handleClose}
       >
           <D.ToolbarButtonCircle
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
