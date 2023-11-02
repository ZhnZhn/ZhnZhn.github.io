import RouterNativeLink from '../native-links/RouterNativeLink';

import A from '../Comp';
import { S_COLOR_BLACK } from '../styleFn';

const CL_DESCR = 'info__descr'
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
, _crTextStyle = () => ({
  ...S_COLOR_BLACK,
  fontWeight: 'bold',
  textTransform: 'capitalize'
})
, S_DESCR_INFO = { lineHeight: 1.7 }
, S_DESCR_TEXT = {
  color: 'grey',
  fontWeight: 'bold'
};

const _renderNdlLink = (linkId) => {
  if (!linkId) return null;
  const Comp = RouterNativeLink['NDL'];
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
 , _style = isShow ? S_SHOW : S_HIDE
 , _textStyle = _crTextStyle();

  return (
    <div style={{...S_ROOT, ..._style}}>
      <A.ButtonTab
        style={S_BT_CAPTION}
        caption="Chart"
        onClick={onClickChart}
      />
      <A.InfoPart
         text={name}
         textStyle={_textStyle}
      />
      <A.InfoPart
         caption="From Date"
         captionStyle={S_INFO_CAPTION}
         text={fromDate}
         textStyle={_textStyle}
      />
      <A.InfoPart
         style={S_TO_DATE_INFO}
         caption="To Date"
         captionStyle={S_INFO_CAPTION}
         text={toDate}
         textStyle={_textStyle}
      />
      <A.InfoPart
         caption="Frequency"
         captionStyle={S_INFO_CAPTION}
         text={frequency}
         textStyle={_textStyle}
      />
      {_renderNdlLink(linkId)}
      { description && <A.OpenClose
           isClose={!_isShortDescr(description)}
           caption="Description"
           //openColor={C_DESCR_OPEN}
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
