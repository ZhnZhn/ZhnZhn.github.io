
const _addBtTo = (arr, caption, title, onClick, compInst) => {
  arr.push({
    caption, title,
    onClick: onClick.bind(compInst)
  })
};

const _createType2WithToolbar = function(
  props, { noDate, noLabels, isOptions } = {}
){
  const buttons = [];

  if (typeof props.onClickInfo === 'function') {
    _addBtTo(buttons, 'I', 'Click to show description about data source',
       this._clickInfoWithToolbar, this
     )
  }
  if (!noLabels) {
    _addBtTo(buttons, 'L', "Click to toggle row's labels",
      this._clickLabelWithToolbar, this
    )
  }
  if (!props.noDate && !noDate) {
    _addBtTo(buttons, 'D', 'Click to toggle date input',
      this._clickDateWithToolbar, this
    )
  }
  if (isOptions){
    this._hideOptionsWithToolbar = this._hideOptionsWithToolbar.bind(this)
    _addBtTo(buttons, 'O', 'Click to show options',
      this._showOptionsWithToolbar, this
    )
    this.dialogOptions = {}
    this._toggleOptionWithToolbar = this._toggleOptionWithToolbar.bind(this)
  }

  return buttons;
}

const _toggleWithToolbar = function(){
  this.setState(prevState => ({
    isToolbar: !prevState.isToolbar
  }))
}

const _clickInfoWithToolbar = function(){
  const { descrUrl, onClickInfo } = this.props;
  onClickInfo({ descrUrl })
}
const _clickLabelWithToolbar = function(){
  this.setState(prevState => ({
     isShowLabels: !prevState.isShowLabels
  }))
}
const _clickDateWithToolbar = function(){
  this.setState(prevState => ({
     isShowDate: !prevState.isShowDate
  }))
}

const _showOptionsWithToolbar = function(){
  this.setState({ isOptions: true })
}
const _hideOptionsWithToolbar = function(){
  this.setState({ isOptions: false })
}
const _toggleOptionWithToolbar = function(propName) {
  this.dialogOptions[propName] = !this.dialogOptions[propName]
}

const withToolbar = (target) => {
  Object.assign(target.prototype, {
    _toggleWithToolbar,
    _createType2WithToolbar,
    _clickInfoWithToolbar,
    _clickLabelWithToolbar,
    _clickDateWithToolbar,
    _showOptionsWithToolbar,
    _hideOptionsWithToolbar,
    _toggleOptionWithToolbar
  })
}

export default withToolbar
