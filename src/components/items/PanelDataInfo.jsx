
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
    paddingTop : '34px',
    paddingRight : '20px',
    paddingLeft : '8px'
  },
  ROOT_HIDE: {
    position: 'relative',
    display: 'none'
  },
  INFO_ROOT: {
    marginTop: '4px'
  },
  INFO_CAPTION: {
    display : 'inline-block',
    color : '#1b75bb',
    width : '110px',
    textAlign : 'right',
    paddingRight : '5px',
    fontWeight : 'bold'
  },
  INFO_TEXT: {
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize'
  },
  DESCR_OC: {
    paddingTop : '12px'
  },
  DESCR_ROOT: {
    marginTop: '10px'
  },
  DESCR_TEXT: {
    color : 'gray',
    fontWeight : 'bold'
  }
};

const _isWithoutLink = (item={}) => {
  const { id='' } = item
      , arr = id.split('/');

  if (arr[0] === 'LSE') {
    return true;
  }
  return false;
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
    if (typeof Comp !== 'undefined') {
      return (<Comp item={item} />);
    } else {
      return null;
    }
  }

  render(){
    const {isShow, info={}, zhInfo={}, onClickChart } = this.props
        , {
             name,
             newest_available_date,
             oldest_available_date,
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
           isShow={false}
           onClick={onClickChart}
         />
         <InfoPart
            text={name}
            styleText={S.INFO_TEXT}
         />
         <InfoPart
            caption="Newest Date:"
            text={newest_available_date}
            rootStyle={S.INFO_ROOT}
            styleCaption={S.INFO_CAPTION}
            styleText={S.INFO_TEXT}
         />
         <InfoPart
            caption="Oldest Date:"
            text={oldest_available_date}
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
