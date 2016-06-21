
import React from 'react';

import ButtonTab from './ButtonTab';
import InfoPart from './InfoPart';

const DESCR_CSS_CLASS = 'info__descr';

const styles = {
  rootShow : {
    position: 'relative',
    display: 'block',
    paddingTop : '24px',
    paddingRight : '20px',
    paddingLeft : '8px',
  },
  rootHide : {
    position: 'relative',
    display: 'none',
  },
  rootStyle : {
    marginTop: '4px'
  },
  label : {
    color : '#1B75BB',
    fontWeight : 'bold'
  },
  text : {
    fontWeight : 'bold'
  },
  textDescr : {
    color : 'gray',
    fontWeight : 'bold'
  }
}

const PanelDataInfo = React.createClass({
  render(){
    const {isShow, onClickChart, info} = this.props
        , {
             name, description,
             newest_available_date,
             oldest_available_date,
             frequency
           } = info
        , styleShow = isShow ? styles.rootShow : styles.rootHide;


    return (
       <div style={styleShow}>
         <ButtonTab
           caption='Chart'
           isShow={false}
           onClick={onClickChart}
         />
         <InfoPart
            caption='Name: '
            text={name}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         <InfoPart
            caption='Newest Date: '
            text={newest_available_date}
            rootStyle={styles.rootStyle}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         <InfoPart
            caption='Oldest Date: '
            text={oldest_available_date}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         <InfoPart
            caption='Frequency: '
            text={frequency}
            styleCaption={styles.label}
            styleText={styles.text}
         />
         <InfoPart
            caption=''
            text={description}
            isHtml={true}
            classText={DESCR_CSS_CLASS}
            rootStyle={styles.rootStyle}
            styleCaption={styles.label}
            styleText={styles.textDescr}
         />
       </div>
    )
  }
});

export default PanelDataInfo
