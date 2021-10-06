import RouterNativeLink from '../native-links/RouterNativeLink';

import A from '../Comp';

const CL_DESCR = 'info__descr'
, C_DESCR_OPEN = '#1b2836'
, S_ROOT = {
  position: 'relative',
  padding: '34px 20px 0 8px'
}
, S_SHOW = { display: 'block' }
, S_HIDE = { display: 'none' }
, S_BT_CAPTION = { left: 286 }
, S_TO_DATE_INFO = { marginTop: 4 }
, S_INFO_CAPTION = {
  display: 'inline-block',
  width: 90,
  paddingRight: 5,
  color: '#1b75bb',
  textAlign: 'right',
  fontWeight: 'bold'
}
, S_INFO_TEXT = {
  color: 'black',
  fontWeight: 'bold',
  textTransform: 'capitalize'
}
, S_DESCR_INFO = { lineHeight: 1.7 }
, S_DESCR_TEXT = {
  color: 'gray',
  fontWeight: 'bold'
};

const _renderQuandlLink = (linkId) => {
  if (!linkId) return null;
  const Comp = RouterNativeLink['QUANDL'];
  return (<Comp linkId={linkId} />);
};

const _renderNativeLink = (linkFn, item) => {
  const Comp = linkFn
    ? RouterNativeLink[linkFn]
    : void 0;
  return Comp != null
    ? <Comp item={item} />
    : null;
};

const _isShortDescr = descr => descr
 && descr.length<200;

const PanelDataInfo = ({
  isShow,
  info,
  zhInfo,
  onClickChart
}) => {
  const {
    name,
    toDate,
    fromDate,
    frequency,
    linkId,
    description
  } = info || {}
 , { item, linkFn } = zhInfo || {}
 , _style = isShow ? S_SHOW : S_HIDE;

  return (
    <div style={{...S_ROOT, ..._style}}>
      <A.ButtonTab
        style={S_BT_CAPTION}
        caption="Chart"
        onClick={onClickChart}
      />
      <A.InfoPart
         text={name}
         textStyle={S_INFO_TEXT}
      />
      <A.InfoPart
         caption="From Date"
         captionStyle={S_INFO_CAPTION}
         text={fromDate}
         textStyle={S_INFO_TEXT}
      />
      <A.InfoPart
         style={S_TO_DATE_INFO}
         caption="To Date"
         captionStyle={S_INFO_CAPTION}
         text={toDate}
         textStyle={S_INFO_TEXT}
      />
      <A.InfoPart
         caption="Frequency"
         captionStyle={S_INFO_CAPTION}
         text={frequency}
         textStyle={S_INFO_TEXT}
      />
      {_renderQuandlLink(linkId)}
      { description && <A.OpenClose
           isClose={!_isShortDescr(description)}
           caption="Description"
           openColor={C_DESCR_OPEN}
          >
            <A.InfoPart
               style={S_DESCR_INFO}
               isHtml={true}
               text={description}
               textCn={CL_DESCR}
               textStyle={S_DESCR_TEXT}
            />
         </A.OpenClose>
      }
      {_renderNativeLink(linkFn, item)}
    </div>
  );
};

export default PanelDataInfo
