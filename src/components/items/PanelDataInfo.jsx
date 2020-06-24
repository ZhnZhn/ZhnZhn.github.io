
import React, { Component } from 'react';

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
    color: '#1b75bb',
    width: 90,
    paddingRight: 5,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  INFO_TEXT: {
    fontWeight: 'bold',
    color: 'black',
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

const _isWithoutLink = (item={}) => {
  const { id='' } = item;
  return id.split('/')[0] === 'LSE'
    ? true
    : false;
};

const _isShortDescr = descr => descr
 && descr.length<200;

class PanelDataInfo extends Component {

  _renderQuandlLink = (dbCode, dsCode) => {
    if (!dbCode || !dsCode){
      return null;
    } else {
      const Comp = RouterNativeLink['QUANDL'];
      return (<Comp dbCode={dbCode} dsCode={dsCode} />);
    }
  }

  _renderNativeLink = (linkFn, item) => {
    if (_isWithoutLink(item)) {
      return null;
    }
    const Comp = RouterNativeLink[linkFn];
    return typeof Comp !== 'undefined'
      ? <Comp item={item} />
      : null;
  }

  render(){
    const {
        isShow,
        info={}, zhInfo={},
        onClickChart
      } = this.props
    , {
        name,
        toDate,
        fromDate,
        frequency,
        database_code, dataset_code,
        description
       } = info
     , { item, linkFn } = zhInfo
     , _style = isShow
         ? S.ROOT_SHOW
         : S.ROOT_HIDE;

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
         {this._renderQuandlLink(database_code, dataset_code)}
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
         {this._renderNativeLink(linkFn, item)}
       </div>
    )
  }
}

export default PanelDataInfo
