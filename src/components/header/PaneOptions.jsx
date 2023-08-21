import useInputData from './useInputData';
import useThemeSelect from '../hooks/useThemeSelect';

import RowPattern from '../dialogs/rows/RowPattern';
import RowInputSelect from '../dialogs/rows/RowInputSelect';
import OptionCheckBoxStack from './OptionCheckBoxStack';
import RowButtons from './RowButtons';
import FlatButton from '../zhn-m/FlatButton';

const S_MR_4 = { marginRight: 4 }
, S_MR_12 = { marginRight: 12 }
, WITHOUT_LABELS_WIDTH = 275;

const UI_THEME_OPTIONS = [
  { caption: 'Dark', value: 'GREY' },
  { caption: 'Light', value: 'WHITE' },
  { caption: 'Sand', value: 'SAND' },
  { caption: 'Sand Light', value: 'SAND_L' }
];

const CHECKBOX_CONFIGS = [
  ['View in Admin Mode', 'isAdminMode'],
  ['Draw Deltas to Min-Max', 'isDrawDeltaExtrems'],
  ['Not Zoom to Min-Max', 'isNotZoomToMinMax']
];

const _crInputStyles = (
  isShowLabels
) => isShowLabels
  ? []
  : [WITHOUT_LABELS_WIDTH, {width: WITHOUT_LABELS_WIDTH}]

const PaneOptions = ({
  isVisible,
  isShowLabels,
  titleStyle,
  btStyle,
  data,
  onClose,
  setRefFocusLast,
  onChangeTheme
}) => {
  const [
    _refProxy,
    _proxy,
    _hSetProxy,
    _hClearProxy
  ] = useInputData(data, 'setProxy')
  , _hSelectTheme = useThemeSelect(onChangeTheme)
  , [
    _width,
    _rowPatterStyle
  ] = _crInputStyles(isShowLabels);

  return (
    <div>
      <RowPattern
        ref={_refProxy}
        isShowLabels={isShowLabels}
        style={_rowPatterStyle}
        captionStyle={titleStyle}
        caption="Proxy"
        placeholder="Local Http Proxy Server"
        initValue={_proxy}
        onEnter={_hSetProxy}
        isClearBlank={true}
        onClear={_hClearProxy}
        errorMsg="Should start with http://127.0.0.1"
      />
      <RowInputSelect
        isShowLabels={isShowLabels}
        width={_width}
        caption="UI Theme"
        captionStyle={titleStyle}
        options={UI_THEME_OPTIONS}
        onSelect={_hSelectTheme}
      />
      <OptionCheckBoxStack
        data={data}
        configs={CHECKBOX_CONFIGS}
      />
      <RowButtons
        style={S_MR_12}
        btStyle={btStyle}
        onClose={onClose}
        setRefFocusLast={isVisible
          ? setRefFocusLast
          : void 0
        }
      >
        <FlatButton
          style={{...btStyle, ...S_MR_4}}
          caption="SET PROXY"
          onClick={_hSetProxy}
        />
      </RowButtons>
    </div>
  );
}

export default PaneOptions
