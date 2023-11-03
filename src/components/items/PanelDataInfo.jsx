import RouterNativeLink from '../native-links/RouterNativeLink';

import A from '../Comp';
import {
  CL_BLACK,
  S_BLOCK,
  S_NONE
} from '../styleFn';

const CL_DESCR = 'info__descr'
, S_ROOT = {
  position: 'relative',
  padding: '34px 20px 0 8px'
}
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
, S_TEXT = {
  fontWeight: 'bold',
  textTransform: 'capitalize'
}
, S_DESCR_INFO = { lineHeight: 1.7 }
, S_DESCR_TEXT = {
  color: 'grey',
  fontWeight: 'bold'
};

const InfoPartWithStyle = ({
  c,
  t,
  s
}) => (
  <A.InfoPart
     style={s}
     caption={c}
     captionStyle={S_INFO_CAPTION}
     textCn={CL_BLACK}
     textStyle={S_TEXT}
     text={t}
  />
);

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
 , _style = isShow ? S_BLOCK : S_NONE;

  return (
    <div style={{...S_ROOT, ..._style}}>
      <A.ButtonTab
        style={S_BT_CAPTION}
        caption="Chart"
        onClick={onClickChart}
      />
      <InfoPartWithStyle t={name} />
      <InfoPartWithStyle c="From Date" t={fromDate} />
      <InfoPartWithStyle c="To Date" t={toDate} s={S_TO_DATE_INFO}/>
      <InfoPartWithStyle c="Frequency" t={frequency} />
      {_renderNdlLink(linkId)}
      { description && <A.OpenClose
           isClose={!_isShortDescr(description)}
           caption="Description"
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
