const _createType2WithToolbar = function(props){
  const toolbarButtons = [];

  if (typeof props.onClickInfo === 'function') {
     toolbarButtons.push({
       caption: 'I', title: 'Information About Dataset',
       onClick: this._clickInfoWithToolbar.bind(this) })
  }
  toolbarButtons.push({
    caption: 'D', title: 'Toggle Date Input',
    onClick: this._clickDateWithToolbar.bind(this)
  })

  return toolbarButtons;
}

const _clickInfoWithToolbar = function(){
  const { descrUrl, onClickInfo } = this.props;
  onClickInfo({ descrUrl })
}

const _clickDateWithToolbar = function(){
  this.setState({ isShowDate: !this.state.isShowDate })
}

const withToolbar = (target) => {
  const _proto = target.prototype;
  _proto._createType2WithToolbar = _createType2WithToolbar
  _proto._clickInfoWithToolbar = _clickInfoWithToolbar
  _proto._clickDateWithToolbar = _clickDateWithToolbar
}

export default withToolbar
