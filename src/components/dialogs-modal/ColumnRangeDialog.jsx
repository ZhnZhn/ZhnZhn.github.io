import {
  Component,
  createRef,
  getInputValue
} from '../uiApi';

import { columnRange } from '../../charts/seriaFns';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import FlatButton from '../zhn-m/FlatButton';
import RowInputText from '../dialogs/RowInputText';
import RowInputColor from '../dialogs/RowInputColor';

const S_TEXT = {
  padding: '16px 0 0 16px',
  fontWeight: 600
}
, S_ROW = { paddingLeft: 8 }
, S_INLINE = { display: 'inline-block' }
, S_CAPTION_1 = { width: 60 }
, S_CAPTION_2 = { width: 100 }
, S_INPUT = { width: 40 };

const DF_POIN_WIDTH = 1
, DF_R1 = 4
, DF_R2 = 0;

const SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: DF_POIN_WIDTH
};

// [n1,n2,fromIndex,toIndex]
const _getNames = s => {
  const n1 = s[0].name
  , n2 = s[1].name;
  return n1 <= n2
    ? [n1, n2, 0, 1]
    : [n2, n1, 1, 0];
};

const _getColor = (
  series,
  index
) => series[index].color;

const _setRadius = (
  value,
  seria
) => {
  const { options } = seria;
  options.marker.radius = value
  seria.update(options, false)
}

const _fHeValue = (
  propName,
  min,
  max
) => function(v) {
  const _ = parseInt(v, 10);
  if ( _>min && _<max) {
    this[propName] = v
  }
}

const _crSeriaOptions = (
  pointWidth
) => ({
  ...SERIA_OPTION,
  ...{ pointWidth }
});

class ColumnRangeDialog extends Component {

  constructor(props){
    super(props)

    this._commandButtons = [
      <FlatButton
         key="yes"
         caption="Yes, Connect"
         isPrimary={true}
         onClick={this._hAdd}
      />
    ]
    this._heWidth = _fHeValue('_pointWidth', -1, 7).bind(this)
    this._heRadius1 = _fHeValue('_r1', -1, 9).bind(this)
    this._heRadius2 = _fHeValue('_r2', -1, 9).bind(this)
    this._r1 = DF_R1
    this._r2 = DF_R2
    this._pointWidth = DF_POIN_WIDTH

    this._refW = createRef()
    this._refR1 = createRef()
    this._refR2 = createRef()
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props
        && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  }

  _hAdd = () => {
    const {
      _fromIndex,
      _toIndex,
      _color,
      props
    } = this
    , {
      data,
      onClose
    } = props
    , { chart } = data
    , _series = chart.series
    , _s1 = _series[_fromIndex]
    , _s2 = _series[_toIndex]
    , _d = columnRange(_s1.data, _s2.data);

     this._heWidth(getInputValue(this._refW))
     this._heRadius1(getInputValue(this._refR1))
     this._heRadius2(getInputValue(this._refR2))

     _setRadius(this._r1, _s1)
     _setRadius(this._r2, _s2)

     chart.zhAddSeriaToYAxis({
       data: _d,
       color: _color,
       yIndex: 0,
     }, _crSeriaOptions(this._pointWidth))

     chart.zhEnableDataLabels("columnrange")
     onClose()
  }

  _heColor = (color) => {
    this._color = color
  }

  render(){
    const {
      isShow,
      data,
      onClose
    } = this.props
    , { chart } = data
    , { series } = chart
    , [
      n1,
      n2,
      fromIndex,
      toIndex
    ] = _getNames(series)
    , c1 = _getColor(series, fromIndex)
    , c2 = _getColor(series, toIndex);

    this._fromIndex = fromIndex
    this._toIndex = toIndex
    this._color = c1
    return(
      <ModalDialog
        caption="Add ColumnRange"
        isShow={isShow}
        commandButtons={this._commandButtons}
        onClose={onClose}
      >
        <div style={S_TEXT}>
          Connect dots series by column range?
        </div>
        <div style={S_ROW}>
          <RowInputColor
            style={S_INLINE}
            captionStyle={S_CAPTION_1}
            caption="Color"
            initValue={c1}
            onEnter={this._heColor}
          />
          <RowInputText
             ref={this._refW}
             styleRoot={S_INLINE}
             styleCaption={S_CAPTION_1}
             styleInput={S_INPUT}
             caption="Width"
             initValue={DF_POIN_WIDTH}
             maxLength={2}
             type="number"
             min={0}
             max={6}
             step={1}
          />
        </div>
        <div style={S_ROW}>
          <RowInputText
             ref={this._refR1}
             styleRoot={S_INLINE}
             styleCaption={{...S_CAPTION_2, ...{ color: c1 }}}
             styleInput={S_INPUT}
             caption={`R ${n1}`}
             initValue={DF_R1}
             type="number"
             maxLength={2}
          />
          <RowInputText
             ref={this._refR2}
             styleRoot={S_INLINE}
             styleCaption={{...S_CAPTION_2, ...{ color: c2 }}}
             styleInput={S_INPUT}
             caption={`R ${n2}`}
             initValue={DF_R2}
             type="number"
             maxLength={2}
          />
       </div>
      </ModalDialog>
    );
  }
}

export default ColumnRangeDialog
