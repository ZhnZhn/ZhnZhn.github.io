import {
  useRef,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';
import useProperty from '../hooks/useProperty';
import useEventCallback from '../hooks/useEventCallback';

import {
  CHAT_LOAD,
  ChartActions
} from '../../flux/actions/ChartActions';

import D from './DialogCell';
import {
  ButtonLoad,
  ButtonShow
} from './Buttons';
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


const IEX_CLOUD_DATA_FEEDS = [
  { a: '1 Month', b: '1m'},
  { a: '3 Months', b: '3m'},
  { a: '6 Months', b: '6m'},
  { a: '1 Year', b: '1y'},
  { a: '2 Years', b: '2y'}
].map(({a, b}) => ({
  caption: 'IEX Cloud: ' + a , value: 'IEX',
  dfProps: {
    dfType: 'chart',
    dfPeriod: b
  }
}))
, TS = 'TIME_SERIES'
, AV_DATA_FEEDS = [
  {c: 'Daily (100)', r: `${TS}_DAILY&outputsize=compact`},
  {c: 'Weekly Adjusted', r: `${TS}_WEEKLY_ADJUSTED`},
  {c: 'Monthly Adjusted', r: `${TS}_MONTHLY_ADJUSTED`},
].map(({c, r})=>({
  caption: `Alpha Vantage: ${c}`,
  value: 'AL',
  route: r,
  dfProps: {
    dfFn: 'EOD',
    dfSubId: 'I'
  }
}))
, DATA_SOURCE_OPTIONS = [
  ...AV_DATA_FEEDS,
  ...IEX_CLOUD_DATA_FEEDS
];

const DF_DATA_SOURCE = DATA_SOURCE_OPTIONS[0];
const _isFn = fn => typeof fn === 'function';

const StocksBySectorDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const [
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
  , _hShow = useEventCallback(()=>{
    if (data && _isFn(data.onShow)) {
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
      ChartActions[CHAT_LOAD](
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
           ...dfProps
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
      <D.ToolbarButtonCircle
        buttons={getRefValue(_refToolbarButtons)}
      />
      <D.RowInputSelect
         isShowLabels={isShowLabels}
         caption="Source"
         placeholder={DF_DATA_SOURCE.caption}
         options={DATA_SOURCE_OPTIONS}
         onSelect={setDataSource}
      />
      <D.ShowHide
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
      </D.ShowHide>
    </ModalDialog>
  );
})

export default StocksBySectorDialog
