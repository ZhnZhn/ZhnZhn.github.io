
import withSet from './withSet'
import withToggle from './withToggle'

const _addBtTo = (arr, caption, title, onClick, compInst) => {
  arr.push({
    caption, title,
    onClick: compInst
      ? onClick.bind(compInst)
      : onClick
  })
};

const _createType2WithToolbar = function(
  props, { noDate, noLabels, isOptions, isToggle } = {}
){
  const buttons = []
  , _set = this._setStateByWithSet
  , _toggle = this._toggleStateByWithToggle;

  if (typeof props.onClickInfo === 'function') {
    _addBtTo(buttons, 'I', 'Click to show description about data source',
       this._clickInfoWithToolbar, this
     )
  }
  if (!noLabels) {
    this._clickLabelWithToolbar = _toggle
      .bind(this, 'isShowLabels')
    _addBtTo(buttons, 'L', "Click to toggle row's labels",
      this._clickLabelWithToolbar
    )
  }
  if (!props.noDate && !noDate) {
     this._clickDateWithToolbar = _toggle
       .bind(this, 'isShowDate')
    _addBtTo(buttons, 'D', 'Click to toggle date input',
      this._clickDateWithToolbar
    )
  }
  if (isOptions){
    this._hideOptionsWithToolbar = _set
      .bind(this, 'isOptions', false)
    this._showOptionsWithToolbar = _set
      .bind(this, 'isOptions', true)
    _addBtTo(buttons, 'O', 'Click to show options',
      this._showOptionsWithToolbar
    )
    this.dialogOptions = {}
    this._toggleOptionWithToolbar = this._toggleOptionWithToolbar.bind(this)
  }
  if (isToggle){
    this._hideToggleWithToolbar = _set
      .bind(this, 'isToggle', false)
    this._showToggleWithToolbar = _set
      .bind(this, 'isToggle', true)
    _addBtTo(buttons, 'T', 'Click to show toggle options',
      this._showToggleWithToolbar
    )
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

const _toggleOptionWithToolbar = function(propName) {
  this.dialogOptions[propName] = !this.dialogOptions[propName]
}

const withToolbar = (target) => {
  withSet(target)
  withToggle(target)
  Object.assign(target.prototype, {
    _toggleWithToolbar,
    _createType2WithToolbar,
    _clickInfoWithToolbar,
    _toggleOptionWithToolbar
  })
}

export default withToolbar
