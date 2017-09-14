const _createType2WithToolbar = function(props, withoutDate){
  const toolbarButtons = [];

  if (typeof props.onClickInfo === 'function') {
     toolbarButtons.push({
       caption: 'I', title: 'Description About Dataset',
       onClick: this._clickInfoWithToolbar.bind(this) })
  }
  if (!withoutDate) {
    toolbarButtons.push({
      caption: 'D', title: 'Toggle Date Input',
      onClick: this._clickDateWithToolbar.bind(this)
    })
  }

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
  Object.assign(target.prototype, {
    _createType2WithToolbar,
    _clickInfoWithToolbar,
    _clickDateWithToolbar
  })  
}

export default withToolbar
