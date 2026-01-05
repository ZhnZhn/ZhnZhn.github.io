import { getValue } from '../../utils/itemFn';
import { merge } from '../../utils/objFn';
import { isInRange } from '../../math/mathFn';

import {
  useRef,
  useMemo,
  getRefValue,
  setRefValue,
  getInputValue
} from '../uiApi';
import {
  crInputNumberProps
} from '../inputFn';

import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import { useRefInit } from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';

import { crExportStyleOptions } from '../../charts/ChartExportConfig';

import { RowFlex } from '../dialogs/rows/RowFlex';
import ModalDialog from '../zhn-moleculs/ModalDialog';
import useCommandButtons from '../zhn-moleculs/useCommandButtons';
import {
  crToolbarButton,
  ToolbarButtonCircle
} from '../zhn/ToolbarButtonCircle';

import ShowHide from '../zhn/ShowHide';
import InputText from '../zhn/InputText';
import InputSelect from '../zhn-select/InputSelect';

const _S_LABEL = {
  display: 'inline-block',
  color: '#1b75bb',
  fontSize: '16px',
  fontWeight: 'bold'
}
, S_MODAL_DIALOG = {
  width: 366
}
, S_MT_10 = {
  marginTop: 10
}
, S_ROW_INPUT_TEXT = {
  margin: '10px 0 5px 8px'
}
, S_LABEL = {
  ..._S_LABEL,
  width: 100,
  paddingRight: 5,
  textAlign: 'right'
}
, S_LABEL_WIDTH = {
  ..._S_LABEL,
  padding: '0 5px 0 10px'
}
, S_INPUT_NUMBER = {
  width: 60,
  height: 30,
  marginLeft: 0,
}
, S_INPUT_TEXT = {
  width: 250,
  height: 34,
  marginLeft: 0
};

const APP_HTML = 'Web app ERC https://zhnzhn.github.io'
, DS_TOP_PADDING = 90
, DS_FONT_SIZE = '10px'
, W_MIN = 351
, W_MAX = 2001
, H_MIN = 251
, H_MAX = 1001;

const  _getDimension = (
  { chartWidth, chartHeight },
  width,
  height
) => [
  isInRange(width, W_MIN, W_MAX)
     ? width
     : chartWidth,
  isInRange(height, H_MIN, H_MAX)
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
, _optionFormats = [
  {caption: "PNG image", value: void 0},
  {caption: "JPEG image", value: { type: "image/jpeg"}},
  {caption: "SVG vector image", value: { type: "image/svg+xml"}}
]
, DF_EXPORT_FORMAT = _optionFormats[0]
, _crCaptionText = refInput => ({
  text: getInputValue(refInput)
});

const _crToolbarToolip = str => `Toggle input ${str}`;

const CustomizeExportDialog = memoIsShow(({
  isShow,
  data=DF_DATA,
  onClose
}) => {
  const [
    isShowDimension,
    toggleDimension
  ] = useToggle(true)
  , [
    isShowTitle,
    toggleTitle
  ] = useToggle(true)
  , [
    isShowStyle,
    toggleStyle
  ] = useToggle(true)
  , _refExportStyle = useRef({})
  , _refExportFormat = useRef(null)
  , _toolbarButtons = useRefInit(() => [
     crToolbarButton("D",_crToolbarToolip("dimension"), toggleDimension),
     crToolbarButton("T",_crToolbarToolip("title"), toggleTitle),
     crToolbarButton("S",_crToolbarToolip("style"), toggleStyle)
  ])
  , _optionStyles = useRefInit(() => crExportStyleOptions())
  , _refInputWidth = useRef()
  , _refInputHeight = useRef()
  , _refInputTitle = useRef()
  , _refInputSubtitle = useRef()
  , [
    _hSelectStyle,
    _hSelectFormat
  ] = useMemo(() => [
    item => setRefValue(
      _refExportStyle,
      getValue(item, {})
    ),
    item => setRefValue(
      _refExportFormat,
      getValue(item, null)
    )
  ], [])
  , { chart } = data
  , _hExport = useEventCallback(() => {
    const [width, height] = _getDimension(
      chart,
      getInputValue(_refInputWidth),
      getInputValue(_refInputHeight)
    )
    , _customOption = merge(
        true, {
          chart: { width, height },
          title: _crCaptionText(_refInputTitle),
          subtitle: _crCaptionText(_refInputSubtitle),
          labels: {
            items: [
              _crItemLabel(APP_HTML),
              _crItemLabel(
                `DataSource: ${chart.userOptions.zhConfig?.dataSource ?? ''}`,
                height - DS_TOP_PADDING, DS_FONT_SIZE
              )
            ]
          }
        }, getRefValue(_refExportStyle));

      chart.exportChartLocal(
        getRefValue(_refExportFormat),
        _customOption
      )
      onClose();
  })
  , _commandButtons = useCommandButtons(() => [
    ["Export", _hExport]
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
      style={S_MODAL_DIALOG}
      caption="Customize Export Chart"
      isShow={isShow}
      commandButtons={_commandButtons}
      onClose={onClose}
    >
       <ToolbarButtonCircle>
         {_toolbarButtons}
       </ToolbarButtonCircle>
       <ShowHide isShow={isShowDimension}>
         <RowFlex>
            <span style={S_LABEL}>Dimension:</span>
            <span style={S_LABEL_WIDTH}>Width</span>
            <InputText
              {...crInputNumberProps(chartWidth, W_MIN, W_MAX)}
              refEl={_refInputWidth}
              placeholder={chartWidth}
              style={S_INPUT_NUMBER}
            />
            <span style={S_LABEL_WIDTH}>Height</span>
            <InputText
              {...crInputNumberProps(chartHeight, H_MIN, H_MAX)}
              refEl={_refInputHeight}
              placeholder={chartHeight}
              style={S_INPUT_NUMBER}
            />
         </RowFlex>
       </ShowHide>
       <ShowHide isShow={isShowTitle}>
         <RowFlex style={S_ROW_INPUT_TEXT}>
           <span style={S_LABEL}>Title</span>
           <InputText
             refEl={_refInputTitle}
             initValue={title}
             style={S_INPUT_TEXT}
           />
         </RowFlex>
         <RowFlex style={S_ROW_INPUT_TEXT}>
           <span style={S_LABEL}>Subtitle</span>
           <InputText
             refEl={_refInputSubtitle}
             initValue={subtitle}
             style={S_INPUT_TEXT}
           />
         </RowFlex>
       </ShowHide>
       <ShowHide isShow={isShowStyle}>
         <RowFlex style={S_MT_10}>
           <span style={S_LABEL}>Style</span>
           <InputSelect
             width="250"
             options={_optionStyles}
             placeholder="Default"
             onSelect={_hSelectStyle}
           />
         </RowFlex>
       </ShowHide>
       <RowFlex style={S_MT_10}>
         <span style={S_LABEL}>Export As</span>
         <InputSelect
           width="250"
           options={_optionFormats}
           placeholder={DF_EXPORT_FORMAT.caption}
           onSelect={_hSelectFormat}
         />
       </RowFlex>
    </ModalDialog>
  );
});

export default CustomizeExportDialog
