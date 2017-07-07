import React, { Component } from 'react'

import DraggableDialog from '../zhn-moleculs/DraggableDialog'
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle'
import RowText from '../dialogs/RowText'
import Button from '../dialogs/Button'

import withToolbar from '../dialogs/decorators/withToolbar'

const S = {
  ROW_TEXT: {
    paddingRight: '16px'
  }
}

@withToolbar
class AlphaIndicatorDialog extends Component {

  constructor(props){
    super()
    this.toolbarButtons = this._createType2WithToolbar(props, true)
    this._commandButtons = [
      <Button.Load onClick={this._handleLoad} />
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
            onShow
          } = this.props;

    return (
      <DraggableDialog
           caption={caption}
           isShow={isShow}
           commandButtons={this._commandButtons}
           onShowChart={onShow}
           onClose={this._handleClose}
       >
           <ToolbarButtonCircle
              buttons={this.toolbarButtons}
           />
           <RowText
             styleRoot={S.ROW_TEXT}
             caption="Alpha:"
             text="Performance by Sector"
           />
      </DraggableDialog>
    );
  }
}

export default AlphaIndicatorDialog
