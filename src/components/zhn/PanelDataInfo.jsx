
import React from 'react';

import ButtonTab from './ButtonTab';
import InfoPart from './InfoPart';

const DESCR_CSS_CLASS = 'info__descr'
    , LINK_CODE_CLASS = 'descr__quandl-link'
    , LINK_CODE_CAPTION = 'Quandl Data Link'
    , QUANDL_DATA_BASE = 'https://www.quandl.com/data/';

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
  codeLink : {
    display : 'inline-block' ,
    paddingTop : '10px'
  },
  text : {
    fontWeight : 'bold',
    color : 'black',
    textTransform: 'capitalize'
  },
  textDescr : {
    color : 'gray',
    fontWeight : 'bold'
  }
}

const PanelDataInfo = React.createClass({

  _renderLinkCode(dbCode, dsCode){
    if (!dbCode || !dsCode){
      return undefined;
    }
    return (
      <a
        className={LINK_CODE_CLASS}
        style={styles.codeLink}
        href={`${QUANDL_DATA_BASE}${dbCode}/${dsCode}`}
      >
        {`${LINK_CODE_CAPTION} ${dbCode}/${dsCode}`}
      </a>
    )
  },

  render(){
    const {isShow, onClickChart, info} = this.props
        , {
             name,
             newest_available_date,
             oldest_available_date,
             frequency,
             database_code, dataset_code,
             description
           } = info
        , styleShow = isShow ? styles.rootShow : styles.rootHide;

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
         {this._renderLinkCode(database_code, dataset_code)}
         <InfoPart
            caption=""
            text={description}
            isHtml={true}
            classText={DESCR_CSS_CLASS}
            rootStyle={styles.rootStyleDescription}
            styleText={styles.textDescr}
         />
       </div>
    )
  }
});

export default PanelDataInfo
