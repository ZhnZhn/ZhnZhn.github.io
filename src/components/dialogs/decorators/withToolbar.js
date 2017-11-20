const _createType2WithToolbar = function(
  props, { noDate, noLabels } = {}
){
  const buttons = [];

  if (typeof props.onClickInfo === 'function') {
     buttons.push({
       caption: 'I', title: 'Description About Dataset',
       onClick: this._clickInfoWithToolbar.bind(this)
     })
  }
  if (!noLabels) {
    buttons.push({
      caption: 'L', title: 'Toggle Row Labels',
      onClick: this._clickLabelWithToolbar.bind(this)
    })
  }
  if (!noDate) {
    buttons.push({
      caption: 'D', title: 'Toggle Date Input',
      onClick: this._clickDateWithToolbar.bind(this)
    })
  }

  return buttons;
}

const _clickInfoWithToolbar = function(){
  const { descrUrl, onClickInfo } = this.props;
  onClickInfo({ descrUrl })
}
const _clickLabelWithToolbar = function(){
  this.setState({
     isShowLabels: !this.state.isShowLabels
  })
}
const _clickDateWithToolbar = function(){
  this.setState({
     isShowDate: !this.state.isShowDate
  })
}

const withToolbar = (target) => {
  Object.assign(target.prototype, {
    _createType2WithToolbar,
    _clickInfoWithToolbar,
    _clickLabelWithToolbar,
    _clickDateWithToolbar
  })
}

export default withToolbar
