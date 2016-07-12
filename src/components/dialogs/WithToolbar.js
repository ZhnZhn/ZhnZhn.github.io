
const WithToolbar = {

  _createType2WithToolbar(){
    const toolbarButtons = [];

    if (typeof this.props.onClickInfo === 'function') {
       toolbarButtons.push({ caption: 'I', onClick: this._clickInfoWithToolbar });
    }
    toolbarButtons.push({ caption: 'D', onClick: this._clickDateWithToolbar })

    return toolbarButtons;
  },

  _clickInfoWithToolbar(){
    const { descrUrl, onClickInfo } = this.props;
    onClickInfo({ descrUrl });
  },
  _clickDateWithToolbar(){
    this.setState({ isShowDate: !this.state.isShowDate });
  }
};

export default WithToolbar
