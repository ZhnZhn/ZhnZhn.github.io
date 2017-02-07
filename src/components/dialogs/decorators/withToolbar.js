const _createType2WithToolbar = function(props){
  const toolbarButtons = [];

  if (typeof props.onClickInfo === 'function') {
     toolbarButtons.push({ caption: 'I', onClick: this._clickInfoWithToolbar.bind(this) });
  }
  toolbarButtons.push({ caption: 'D', onClick: this._clickDateWithToolbar.bind(this) })

  return toolbarButtons;
}

const _clickInfoWithToolbar = function(){  
  const { descrUrl, onClickInfo } = this.props;
  onClickInfo({ descrUrl });
}

const _clickDateWithToolbar = function(){
  this.setState({ isShowDate: !this.state.isShowDate });
}

const withToolbar = (target) => {
  target.prototype._createType2WithToolbar = _createType2WithToolbar;
  target.prototype._clickInfoWithToolbar = _clickInfoWithToolbar;
  target.prototype._clickDateWithToolbar = _clickDateWithToolbar;
}

export default withToolbar
