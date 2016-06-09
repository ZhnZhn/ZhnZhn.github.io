import React from 'react';

import ZhSelect from '../ZhSelect';
import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const RowInputSelect = React.createClass({
  render(){
    const {
           caption,
           isLoading, isLoadingFailed,
           options, optionNames, placeholder,
           onLoadOption, onSelect
         } = this.props;
    return (
       <div style={styles.rowDiv}>
          <span style={styles.labelSpan}>
             {caption}
          </span>
          <ZhSelect
            width="250"
            isLoading={isLoading}
            isLoadingFailed={isLoadingFailed}
            options={options}
            optionNames={optionNames}
            placeholder={placeholder}
            onLoadOption={onLoadOption}
            onSelect={onSelect}
          />
      </div>
   );
 }
});

export default RowInputSelect
