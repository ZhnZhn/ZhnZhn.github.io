import {
  useRef,
  getRefValue,
  getInputValue,
  isFn
} from '../uiApi';

import { LT_AV } from '../../constants/LoadType';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';

import { loadItem } from '../../flux/stores/itemStore';

import {
  ButtonLoad,
  ButtonShow
} from '../dialogs/Buttons';
import RowInputSelect from '../dialogs/rows/RowInputSelect';
import RowChart from '../dialogs/rows/RowChart';
import {
  crChartOptions
} from '../dialogs/ChartOptionsFn';
import ShowHide from '../zhn/ShowHide';
import ToolbarButtonCircle from '../zhn/ToolbarButtonCircle';
import ModalDialog from '../zhn-moleculs/ModalDialog';
import NasdaqLink from '../native-links/NasdaqLink';

const S_ROOT_NOT_LABELS = { width: 280 }
, S_CAPTION = {
  display: 'inline-block',
  maxWidth: 295
}
, S_LINK_SHOW_HIDE = { marginBottom: 10 }
, S_LINK_ROOT = {
  display: 'flex',
  alignItems: 'center',
  margin: '8px 5px 0 5px',
  lineHeight: 1.5,
  fontWeight: 'bold'
}
, S_LINK_CAPTION = {
  color: '#1b75bb',
  display: 'inline-block',
  width: 100,
  paddingRight: 5,
  textAlign: 'right',
  fontSize: '16px'
}
, S_LINK = { paddingTop: 0 }
, S_LINK_NOT_LABELS = { marginLeft: 8 };

const _crTsAdjToken = period => `TIME_SERIES_${period}_ADJUSTED`
, AV_DATA_FEEDS = [
  {c: 'Daily Adjusted (100)', r: `${_crTsAdjToken('DAILY')}&outputsize=compact`},
  {c: 'Weekly Adjusted', r: _crTsAdjToken('WEEKLY')},
  {c: 'Monthly Adjusted', r: _crTsAdjToken('MONTHLY')}
].map(({c, r})=>({
  caption: `Alpha Vantage: ${c}`,
  value: LT_AV,
  route: r,
  dfProps: {
    dfFn: 'EOD',
    dfSubId: 'I'
  }
}))
, DATA_SOURCE_OPTIONS = [
  ...AV_DATA_FEEDS
];

const DF_DATA_SOURCE = DATA_SOURCE_OPTIONS[0];
const CHART_OPTIONS = crChartOptions(void 0, 't1')

const StocksBySectorDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const refSeriaColor = useRef()
  , [
    isShowLabels,
    toggleLabels
  ] = useToggle(true)
  , [
    isShowLink,
    toggleLink
  ] = useToggle()
  , _refToolbarButtons = useRef([{
       caption: 'L',
       title: 'Click to toggle labels',
       onClick: toggleLabels
     },{
      caption: 'O',
      title: 'Click to toggle options',
      onClick: toggleLink
   }])
  , [
    setDataSource,
    getDataSource
  ] = useProperty()
  , [
    setChartType,
    getChartType
  ] = useProperty()
  , _hShow = useEventCallback(()=>{
    if (data && isFn(data.onShow)) {
      data.onShow()
    }
  })
  , _hLoad = useEventCallback(() => {
    const {
      item,
      browserType,
      chartContainerType,
      dialogProps
    } = data || {}
    , { id, text } = item || {}
    , {
      caption,
      value,
      route,
      dfProps
    } = getDataSource() || DF_DATA_SOURCE;
    if (id) {
      const _chartTypeItem = getChartType();
      loadItem(
        {
          chartType: chartContainerType,
          browserType
        },{
           id,
           item,
           items: [
             {c: text, v: id},
             {c: caption, v: route}
           ],
           title: text,
           value: id,
           loadId: value,
           _itemKey: `${id}_${value}`,
           linkFn: 'NASDAQ',
           dataSource: caption,
           ...dialogProps,
           ...dfProps,
           // seriaColor, seriaWidth
           ...getInputValue(refSeriaColor),
           seriaType: _chartTypeItem
              ? _chartTypeItem.value
              : void 0
         }
      )
    }
    onClose()
  })
  , _refCommandButtons = useRef([
    <ButtonLoad
      key="load"
      onClick={_hLoad}
    />,
    <ButtonShow
      key="show"
      onClick={_hShow}
    />
  ])

  const { item } = data || {}
  , { text } = item || {}
  , _style = isShowLabels
       ? null
       : S_ROOT_NOT_LABELS
  , _linkStyle = isShowLabels
       ? S_LINK
       : {...S_LINK, ...S_LINK_NOT_LABELS};

  return (
    <ModalDialog
       caption={text}
       style={_style}
       styleCaption={S_CAPTION}
       isShow={isShow}
       commandButtons={getRefValue(_refCommandButtons)}
       onClose={onClose}
    >
      <ToolbarButtonCircle
        buttons={getRefValue(_refToolbarButtons)}
      />
      <RowInputSelect
         isShowLabels={isShowLabels}
         caption="Source"
         placeholder={DF_DATA_SOURCE.caption}
         options={DATA_SOURCE_OPTIONS}
         onSelect={setDataSource}
      />
      <RowChart
         refSeriaColor={refSeriaColor}
         isShowLabels={isShowLabels}
         options={CHART_OPTIONS}
         onSelectChart={setChartType}
      />
      <ShowHide
         isShow={isShowLink}
         style={S_LINK_SHOW_HIDE}
       >
         <div style={S_LINK_ROOT}>
           {
             isShowLabels && <span style={S_LINK_CAPTION}>
               Link:
             </span>
           }
           <NasdaqLink
              style={_linkStyle}
              item={item}
              caption="NASDAQ"
            />
         </div>
      </ShowHide>
    </ModalDialog>
  );
})

export default StocksBySectorDialog
