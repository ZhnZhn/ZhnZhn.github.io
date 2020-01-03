
import React, { Component } from 'react';

import RouterNativeLink from '../native-links/RouterNativeLink';

import ButtonTab from '../zhn/ButtonTab';
import InfoPart from '../zhn/InfoPart';
import OpenClose2 from '../zhn/OpenClose2';

const CL_DESCR = 'info__descr';

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
  INFO_ROOT: {
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
  DESCR_OC: {
    paddingTop: 12
  },
  DESCR_ROOT: {
    marginTop: 10
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
    const {isShow, info={}, zhInfo={}, onClickChart } = this.props
        , {
             name,
             toDate,
             fromDate,
             frequency,
             database_code, dataset_code,
             description
           } = info
         , { item, linkFn } = zhInfo
         , _rootStyle = isShow
             ? S.ROOT_SHOW
             : S.ROOT_HIDE
         , _isDescr = description ? true : false
         , _isDescrClose = (_isDescr && description.length>200)
                ? true
                : false;
    return (
       <div style={_rootStyle}>
         <ButtonTab
           caption="Chart"
           onClick={onClickChart}
         />
         <InfoPart
            text={name}
            styleText={S.INFO_TEXT}
         />
         <InfoPart
            caption="From Date:"
            text={fromDate}
            styleCaption={S.INFO_CAPTION}
            styleText={S.INFO_TEXT}
         />
         <InfoPart
            caption="To Date:"
            text={toDate}
            rootStyle={S.INFO_ROOT}
            styleCaption={S.INFO_CAPTION}
            styleText={S.INFO_TEXT}
         />
         <InfoPart
            caption="Frequency:"
            text={frequency}
            styleCaption={S.INFO_CAPTION}
            styleText={S.INFO_TEXT}
         />
         {this._renderQuandlLink(database_code, dataset_code)}
         { _isDescr && <OpenClose2
              caption="Description"
              isClose={_isDescrClose}
              style={S.DESCR_OC}
             >
               <InfoPart
                  text={description}
                  isHtml={true}
                  classText={CL_DESCR}
                  rootStyle={S.DESCR_ROOT}
                  styleText={S.DESCR_TEXT}
               />
            </OpenClose2>
         }
         {this._renderNativeLink(linkFn, item)}
       </div>
    )
  }
}

export default PanelDataInfo
