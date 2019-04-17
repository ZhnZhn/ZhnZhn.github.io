
import withSet from './withSet'
import withToggle from './withToggle'

const C = {
  BT_I: {
     M: '_clickInfoWithToolbar',
     BT_C: 'I',
     BT_T: 'Click to show description about data source'
  },
  BT_L: {
    M_T: '_clickLabelWithToolbar',
    PN: 'isShowLabels',
    BT_C: 'L',
    BT_T: "Click to toggle row's labels"
  },
  BT_D: {
    M_T: '_clickDateWithToolbar',
    PN: 'isShowDate',
    BT_C: 'D',
    BT_T: "Click to toggle date input"
  },
  BT_O: {
    M: 'Options',
    PN: 'isOptions',
    BT_C: 'O',
    BT_T: 'Click to show options'
  },
  BT_T: {
    M: 'Toggle',
    PN: 'isToggle',
    BT_C: 'T',
    BT_T: 'Click to show toggle options'
  },
  BT_TO: {
    M_T: '_toggleOptionWithToolbar',
    PN: 'isToggleOptions',
    BT_C: 'O',
    BT_T: "Click to toggle dialog's options"
  }
};

const _isFn = fn => typeof fn === 'function';

const _addBtTo = (arr, CONF, onClick) => {
  arr.push({
    caption: CONF.BT_C,
    title: CONF.BT_T,
    onClick
  })
};

const _addToggleBt = ({ inst, buttons, key }) => {
  const _toggle = inst._toggleStateByWithToggle
  , CONF = C[key];
  inst[CONF.M_T] = _toggle.bind(inst, CONF.PN)
  _addBtTo(buttons, CONF, inst[CONF.M_T])
};

const _addShowHideBt = ({ inst, buttons, key }) => {
  const _set = inst._setStateByWithSet
  , CONF = C[key]
  , _hidePn = `_hide${CONF.M}WithToolbar`
  , _showPn = `_show${CONF.M}WithToolbar`;
  inst[_hidePn] = _set.bind(inst, CONF.PN, false)
  inst[_showPn] = _set.bind(inst, CONF.PN, true)
  _addBtTo(buttons, CONF, inst[_showPn])
};

const _createType2WithToolbar = function(
  props, { noDate, noLabels, isOptions, isToggle, isToggleOptions } = {}
){
  const buttons = [];

  if ( _isFn(props.onClickInfo) ) {
    _addBtTo(buttons, C.BT_I,
       this._clickInfoWithToolbar.bind(this)
     )
  }
  if (!noLabels) {
    _addToggleBt({ inst: this, buttons, key: 'BT_L' })
  }
  if (!props.noDate && !noDate) {
    _addToggleBt({ inst: this, buttons, key: 'BT_D' })
  }
  if (isOptions){
    _addShowHideBt({ inst: this, buttons, key: 'BT_O'})
    this.dialogOptions = {}
    this._toggleOptionWithToolbar = this._toggleOptionWithToolbar.bind(this)
  }
  if (isToggle){
    _addShowHideBt({ inst: this, buttons, key: 'BT_T'})
  }
  if (isToggleOptions) {
    _addToggleBt({ inst: this, buttons, key: 'BT_TO' })
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
