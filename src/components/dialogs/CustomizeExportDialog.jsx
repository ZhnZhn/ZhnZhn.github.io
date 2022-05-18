import { useRef, useMemo } from 'react';
import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useRefInit from '../hooks/useRefInit';
import useEventCallback from '../hooks/useEventCallback';

import {
  merge,
  crExportStyleOptions
} from '../../charts/ChartExportConfig';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import STYLE from '../styles/DialogStyles';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import Button from './Button'

import ShowHide from '../zhn/ShowHide';
import InputText from '../zhn/InputText';
import InputSelect from '../zhn-select/InputSelect';

const _S_LABEL = {
  display: 'inline-block',
  color: '#1b75bb',
  fontSize: '16px',
  fontWeight: 'bold'
}
, S_ROW_WITH_TOP_GAP = {
  ...STYLE.ROW,
  ...{ marginTop: 10 }
}
, S_LABEL = {
  ..._S_LABEL,
  width: 100,
  paddingRight: 5,
  textAlign: 'right'
}
, S_LABEL_WIDTH = {
  ..._S_LABEL,
  padding: '0 5px 0 3px'
}
, S_LABEL_HEIGHT = {
  ...S_LABEL_WIDTH,
  paddingLeft: 6
}
, S_INPUT_NUMBER = {
  width: 60,
  height: 30,
  marginLeft: 0,
}
, S_INPUT_TEXT = {
  width: 250,
  height: 30,
  marginLeft: 0
};

const APP_HTML = 'Web app ERC https://zhnzhn.github.io'
, DS_TOP_PADDING = 90
, DS_FONT_SIZE = '10px'
, W_MIN = 351
, W_MAX = 2001
, H_MIN = 251
, H_MAX = 1001;

const _getRefValue = ref => ref.current
, _getValue = ref => _getRefValue(ref).getValue()
, _inRange = (v, min, max) => v>min && v<max
, _getDimension = (
  { chartWidth, chartHeight },
  width,
  height
) => [
  _inRange(width, W_MIN, W_MAX)
     ? width
     : chartWidth,
  _inRange(height, H_MIN, H_MAX)
     ? height
     : chartHeight
];

const _crItemLabel = (
  html,
  top=-70,
  fontSize='9px'
) => ({
  html,
  style: {
    left: 0,
    top: top,
    color: '#909090',
    'font-size': fontSize
  }
});

const DF_DATA = {}

const CustomizeExportDialog = memoIsShow(({
  isShow,
  data=DF_DATA,
  onClose
}) => {
  const [isShowDimension, toggleDimension] = useToggle(true)
  , [isShowTitle, toggleTitle] = useToggle(true)
  , [isShowStyle, toggleStyle] = useToggle(true)
  , _refExportStyle = useRef({})
  , _refToolbarButtons = useRef([
    { caption: 'D', onClick: toggleDimension },
    { caption: 'T', onClick: toggleTitle },
    { caption: 'S', onClick: toggleStyle }
  ])
  , _optionStyles = useRefInit(() => crExportStyleOptions())
  , _refInputWidth = useRef()
  , _refInputHeight = useRef()
  , _refInputTitle = useRef()
  , _refInputSubtitle = useRef()

  , _hSelectStyle = useMemo(() => (item) => {
    _refExportStyle.current = item
       && item.value || {};
  }, [])
  , { chart, fn } = data
  , _hExport = useEventCallback(() => {
    const [width, height] = _getDimension(
      chart,
      _getValue(_refInputWidth),
      _getValue(_refInputHeight)
    )
    , _customOption = merge(
        true, {
          chart: { width, height },
          title: {
            text: _getValue(_refInputTitle)
          },
          subtitle: {
            text: _getValue(_refInputSubtitle)
          },
          labels: {
            items: [
              _crItemLabel(APP_HTML),
              _crItemLabel(
                `DataSource: ${chart.userOptions.zhConfig?.dataSource ?? ''}`,
                height - DS_TOP_PADDING, DS_FONT_SIZE
              )
            ]
          }
        }, _getRefValue(_refExportStyle));

      fn.apply(chart, [null, _customOption]);
      onClose();
  })
  , _refCommandButtons = useRef([
       <Button.Flat
          key="export"
          caption="Export"
          isPrimary={true}
          onClick={_hExport}
       />
  ]);

  const {
    chartWidth,
    chartHeight,
    options
  } = chart
  , title = options.title.text
  , subtitle = options.subtitle.text;

  return (
    <ModalDialog
      caption="Customize Export Chart"
      isShow={isShow}
      commandButtons={_getRefValue(_refCommandButtons)}
      onClose={onClose}
    >
       <ToolbarButtonCircle
         buttons={_getRefValue(_refToolbarButtons)}
       />
       <ShowHide isShow={isShowDimension}>
         <div style={STYLE.ROW}>
            <span style={S_LABEL}>Dimension:</span>
            <span style={S_LABEL_WIDTH}>Width:</span>
            <InputText
              ref={_refInputWidth}
              type="number"
              placeholder={chartWidth}
              initValue={chartWidth}
              style={S_INPUT_NUMBER}
              min={W_MIN}
              max={W_MAX}
            />
            <span style={S_LABEL_HEIGHT}>Height:</span>
            <InputText
              ref={_refInputHeight}
              type="number"
              placeholder={chartHeight}
              initValue={chartHeight}
              style={S_INPUT_NUMBER}
              min={H_MIN}
              max={H_MAX}
            />
         </div>
       </ShowHide>
       <ShowHide isShow={isShowTitle}>
         <div style={S_ROW_WITH_TOP_GAP}>
           <span style={S_LABEL}>Title:</span>
           <InputText
             ref={_refInputTitle}
             initValue={title}
             style={S_INPUT_TEXT}
           />
         </div>
         <div style={STYLE.ROW}>
           <span style={S_LABEL}>Subtitle:</span>
           <InputText
             ref={_refInputSubtitle}
             initValue={subtitle}
             style={S_INPUT_TEXT}
           />
         </div>
       </ShowHide>
       <ShowHide isShow={isShowStyle}>
         <div style={S_ROW_WITH_TOP_GAP}>
           <span style={S_LABEL}>Style:</span>
           <InputSelect
             width="250"
             options={_optionStyles}
             placeholder="Default"
             onSelect={_hSelectStyle}
           />
         </div>
       </ShowHide>
    </ModalDialog>
  );
});

export default CustomizeExportDialog
