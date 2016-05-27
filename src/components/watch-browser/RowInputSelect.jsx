import React from 'react';

import ZhSelect from '../ZhSelect';
import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;
const Styles = {
  CAPTION : {
    width: '120px'
  }
}

const RowInputSelect = React.createClass({
  displayName : 'RowInputSelect',
  propTypes : {
    caption : React.PropTypes.string,
    options : React.PropTypes.array,
    isUpdateOptions : React.PropTypes.bool,
    onSelect : React.PropTypes.func
  },
  render(){
    const {caption, options, isUpdateOptions, onSelect} = this.props;
    return (
      <div style={Object.assign({}, styles.rowDiv)}>
         <span style={Object.assign({}, styles.labelSpan, Styles.CAPTION)}>
           {caption}
         </span>
         <ZhSelect
            width="250"
            options={options}
            isUpdateOptions={isUpdateOptions}
            onSelect={onSelect}

         />
      </div>
    );
  }
});

export default RowInputSelect
