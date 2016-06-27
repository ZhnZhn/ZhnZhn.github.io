import React from 'react';

import MenuBrowser from '../zhn/MenuBrowser';

const QuandlBrowser = React.createClass({
  render(){
    const props = this.props;
    return (
      <MenuBrowser {...props} />
    )
  }
});

export default QuandlBrowser;
