import React from 'react';

const styles = {
  show : {
    display: 'block'
  },
  hide : {
    display : 'none'
  }
};

const ShowHide = React.createClass({
  render(){
    const {isShow, style, children} = this.props
        , _styleShow = isShow ? styles.show : styles.hide
        , _classShow = isShow ? 'show-popup' : null;

    return (
      <div className={_classShow} style={Object.assign({}, style, _styleShow)}>
        {children}
      </div>
    )
  }
});

export default ShowHide
