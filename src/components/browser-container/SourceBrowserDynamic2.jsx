import React, { Component } from 'react';

import MenuBrowserDynamic2 from '../zhn/MenuBrowserDynamic2';

class SourceBrowserDynamic2 extends Component {
  shouldComponentUpdate(){
    return false;
  }

  render(){
    return ( <MenuBrowserDynamic2 {...this.props} />);
  }
}

export default SourceBrowserDynamic2
