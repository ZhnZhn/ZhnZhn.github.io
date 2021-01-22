import RouterNativeLink from '../native-links/RouterNativeLink';

import A from '../Comp'

const CL_DESCR = 'info__descr';
const C_DESCR_OPEN = '#1b2836';
const S = {
  ROOT_SHOW: {
    position: 'relative',
    display: 'block',
    paddingTop: 34,
    paddingRight: 20,
    paddingLeft: 8
  },
  ROOT_HIDE: {
    position: 'relative',
    display: 'none'
  },
  BT_CAPTION: {
    left: 286
  },
  TO_DATE_INFO: {
    marginTop: 4
  },
  INFO_CAPTION: {
    display: 'inline-block',
    width: 90,
    paddingRight: 5,
    color: '#1b75bb',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  INFO_TEXT: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  DESCR_INFO: {
    lineHeight: 1.7
  },
  DESCR_TEXT: {
    color: 'gray',
    fontWeight: 'bold'
  }
};

const _renderQuandlLink = (dbCode, dsCode) => {
  const Comp = RouterNativeLink['QUANDL'];
  return (<Comp dbCode={dbCode} dsCode={dsCode} />);
};

const _renderNativeLink = (linkFn, item) => {
  const Comp = linkFn
    ? RouterNativeLink[linkFn]
    : void 0;
  return Comp != null
    ? <Comp item={item} />
    : null;
}

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
    database_code, dataset_code,
    description
  } = info || {}
 , { item, linkFn } = zhInfo || {}
 , _style = isShow ? S.ROOT_SHOW : S.ROOT_HIDE;

  return (
    <div style={_style}>
      <A.ButtonTab
        style={S.BT_CAPTION}
        caption="Chart"
        onClick={onClickChart}
      />
      <A.InfoPart
         text={name}
         styleText={S.INFO_TEXT}
      />
      <A.InfoPart
         caption="From Date"
         styleCaption={S.INFO_CAPTION}
         text={fromDate}
         styleText={S.INFO_TEXT}
      />
      <A.InfoPart
         style={S.TO_DATE_INFO}
         caption="To Date"
         styleCaption={S.INFO_CAPTION}
         text={toDate}
         styleText={S.INFO_TEXT}
      />
      <A.InfoPart
         caption="Frequency"
         styleCaption={S.INFO_CAPTION}
         text={frequency}
         styleText={S.INFO_TEXT}
      />
      {_renderQuandlLink(database_code, dataset_code)}
      { description && <A.OpenClose
           isClose={!_isShortDescr(description)}
           caption="Description"
           openColor={C_DESCR_OPEN}
          >
            <A.InfoPart
               style={S.DESCR_INFO}
               isHtml={true}
               text={description}
               classText={CL_DESCR}
               styleText={S.DESCR_TEXT}
            />
         </A.OpenClose>
      }
      {_renderNativeLink(linkFn, item)}
    </div>
  );
};

export default PanelDataInfo
