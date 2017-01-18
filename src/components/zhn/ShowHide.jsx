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
    const {isShow, className, style, children} = this.props
        , _styleShow = isShow ? styles.show : styles.hide
        , _classShow = isShow ? 'show-popup' : ''
        , _className = (className)
              ? `${className} ${_classShow}`
              : (_classShow !== '')
                   ? _classShow
                   : undefined;

    return (
      <div
        className={_className}
        style={Object.assign({}, style, _styleShow)}
      >
        {children}
      </div>
    )
  }
});

export default ShowHide
