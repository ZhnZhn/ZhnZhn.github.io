import React, { Component } from 'react';

import MenuBrowserDynamic from '../zhn/MenuBrowserDynamic';

class SourceBrowserDynamic extends Component {
  shouldComponentUpdate(){
    return false;
  }

  render(){
    return ( <MenuBrowserDynamic {...this.props} /> );
  }
}

export default SourceBrowserDynamic
