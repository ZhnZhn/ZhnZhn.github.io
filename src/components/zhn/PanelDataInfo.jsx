
import React from 'react';

import ButtonTab from './ButtonTab';
import InfoPart from './InfoPart';

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
  label : {
    color : '#1B75BB',
    fontWeight : 'bold'
  }
}

const PanelDataInfo = React.createClass({
  render(){
    const {isShow, onClickChart, info} = this.props;
    const {
             name, description,
             newest_available_date,
             oldest_available_date,
             frequency
           } = info;
    const styleShow = isShow ? styles.rootShow : styles.rootHide;

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
         />
         <InfoPart
            caption='Newest Date: '
            text={newest_available_date}
            rootStyle={{marginTop: '4px'}}
            styleCaption={styles.label}
         />
         <InfoPart
            caption='Oldest Date: '
            text={oldest_available_date}
            styleCaption={styles.label}
         />
         <InfoPart
            caption='Frequency: '
            text={frequency}
            styleCaption={styles.label}
         />
         <InfoPart
            caption='Description: '
            text={description}
            rootStyle={{marginTop: '4px'}}
            styleCaption={styles.label}
         />
       </div>
    )
  }
});

export default PanelDataInfo
