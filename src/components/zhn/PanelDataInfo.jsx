
import React, { Component } from 'react';

import RouterNativeLink from '../native-links/RouterNativeLink';

import ButtonTab from './ButtonTab';
import InfoPart from './InfoPart';
import OpenClose2 from './OpenClose2';

const DESCR_CSS_CLASS = 'info__descr'

const styles = {
  rootShow : {
    position: 'relative',
    display: 'block',
    paddingTop : '34px',
    paddingRight : '20px',
    paddingLeft : '8px'
  },
  rootHide : {
    position: 'relative',
    display: 'none'
  },
  rootStyle : {
    marginTop: '4px'
  },
  rootStyleDescription : {
    marginTop: '10px'
  },
  label : {
    display : 'inline-block',
    color : '#1B75BB',
    width : '110px',
    textAlign : 'right',
    paddingRight : '5px',
    fontWeight : 'bold'
  },
  text : {
    fontWeight : 'bold',
    color : 'black',
    textTransform: 'capitalize'
  },
  description : {
    paddingTop : '12px'
  },
  textDescr : {
    color : 'gray',
    fontWeight : 'bold'
  }
}

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
         , styleShow = isShow
             ? styles.rootShow
             : styles.rootHide
         , _isDescr = description ? true : false
         , _isDescrClose = (_isDescr && description.length>200)
                ? true
                : false;
    return (
       <div style={styleShow}>
         <ButtonTab
           caption="Chart"
           isShow={false}
           onClick={onClickChart}
         />
         <InfoPart
            caption=""
            text={name}
            styleCaption={{ display: 'none' }}
            styleText={styles.text}
         />
         <InfoPart
            caption="Newest Date: "
            text={newest_available_date}
            rootStyle={styles.rootStyle}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         <InfoPart
            caption="Oldest Date: "
            text={oldest_available_date}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         <InfoPart
            caption="Frequency: "
            text={frequency}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         {this._renderQuandlLink(database_code, dataset_code)}
         { _isDescr && <OpenClose2
              caption="Description"
              isClose={_isDescrClose}
              style={styles.description}
             >
               <InfoPart
                  caption=""
                  text={description}
                  isHtml={true}
                  classText={DESCR_CSS_CLASS}
                  rootStyle={styles.rootStyleDescription}
                  styleText={styles.textDescr}
               />
            </OpenClose2>
         }
         {this._renderNativeLink(linkFn, item)}
       </div>
    )
  }
}

export default PanelDataInfo
