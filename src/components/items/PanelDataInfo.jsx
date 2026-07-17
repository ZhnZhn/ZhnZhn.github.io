import {
  isArr,
  isStr
} from '../../utils/isTypeFn';
import RouterNativeLink from '../native-links/RouterNativeLink';

import useWasShown from '../hooks/useWasShown';

import InfoPart from '../zhn/InfoPart';
import ButtonTab from '../zhn/ButtonTab';
import OpenClose from '../zhn/OpenClose';
import Link from '../zhn/Link'

import {
  CL_BLACK,
  S_BLOCK,
  S_NONE,
  S_FONT_WEIGHT_BOLD
} from '../styleFn';

const CL_DESCR = `info__descr ${CL_BLACK}`
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
  ...S_FONT_WEIGHT_BOLD
}
, S_TEXT = {
  textTransform: 'capitalize',
  ...S_FONT_WEIGHT_BOLD
}
, S_DESCR_INFO = {
  lineHeight: 1.6
};

const InfoPartWithStyle = ({
  c,
  t,
  s
}) => (
  <InfoPart
     style={s}
     caption={c}
     captionStyle={S_INFO_CAPTION}
     textCn={CL_BLACK}
     textStyle={S_TEXT}
     text={t}
  />
);

const BoldParagraph = ({
  text
}) => text
  ? (<p style={S_FONT_WEIGHT_BOLD}>{text}</p>)
  : null;

const InfoDescr = ({ descr }) => !descr
  ? null
  : isArr(descr)
  ? descr.map(text => (<BoldParagraph key={text} text={text} />))
  : (<BoldParagraph text={descr} />)

const InfoLink = ({ href }) => isArr(href)
  ? (<p><Link href={href[0]}>{href[1]}</Link></p>)
  : null;

const _renderNdlLink = (linkId) => {
  if (!linkId) return null;
  const Comp = RouterNativeLink.NDL;
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

const DESCR_SHORT_LENGTH = 200;
const _isShortDescr = descr => {
  const _length = isStr(descr)
    ? descr.length
    : isArr(descr)
    ? descr.reduce((total, token) => {
        return isStr(token)
          ? total + token.length
          : total;
      }, 0)
    : 0;
  return _length < DESCR_SHORT_LENGTH;
};

const PanelDataInfo = (props) => {
  const _wasShown = useWasShown(props.isShow)
  , _info = props.info || {}

  , _infoDescr = _info.descr
  , _infoHref = _info.href

  , _zhInfo = props.zhInfo || {}
  , _style = props.isShow
    ? S_BLOCK
    : S_NONE;

  return _wasShown ? (
    <div style={{...S_ROOT, ..._style}}>
      <ButtonTab
        style={S_BT_CAPTION}
        caption="Chart"
        onClick={props.onClickChart}
      />
      <InfoPartWithStyle t={_info.name} />
      <InfoPartWithStyle c="From Date" t={_info.fromDate} />
      <InfoPartWithStyle c="To Date" t={_info.toDate} s={S_TO_DATE_INFO}/>
      <InfoPartWithStyle c="Frequency" t={_info.frequency} />
      {_renderNdlLink(_info.linkId)}
      { (_infoDescr || isArr(_infoHref)) && <OpenClose
           isClose={!_isShortDescr(_infoDescr)}
           caption="Description"
          >
            <InfoDescr descr={_infoDescr} />
            <InfoLink href={_infoHref} />
            <InfoLink href={_info.href2} />
         </OpenClose>
      }
      {_renderNativeLink(_zhInfo.linkFn, _zhInfo.item)}
    </div>
  ) : null;
};

export default PanelDataInfo
