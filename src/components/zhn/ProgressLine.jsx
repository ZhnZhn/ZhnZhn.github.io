import React, { Component } from 'react';

const CL = "progress-line";

const T = {  
  WIDTH: 'width 350ms linear',
  OPACITY: 'opacity 250ms linear'
};

const _crStyle = (backgroundColor, opacity, width, transition) => ({
   backgroundColor, width, opacity, transition
});

class ProgressLine extends Component {
  static defaultProps = {
    color: '#2f7ed8'
  }

  constructor(props){
    super();
    this.wasCompleted = false;
    this.idCompleted = null;
    this.wasOpacied = false;
    this.idOpacied = null;
  }

  componentWillUnmount(){
    if (this.idCompleted){
      clearTimeout(this.idCompleted)
    }
    if (this.idOpacied){
      clearTimeout(this.idOpacied)
    }
  }

  componentDidUpdate(){
    if (this.wasCompleted){
      this.idCompleted = setTimeout(()=>{
        this.idCompleted = null;
        this.forceUpdate();
      }, 800)
    } else if (this.wasOpacied){
      this.idOpacied = setTimeout(()=>{
        this.idOpacied = null;
        this.forceUpdate();
      }, 800)
    }
  }

  render(){
    const { color } = this.props;
    let _style;

    if (this.wasOpacied) {
      _style = _crStyle(color, 1, 0)
      this.wasOpacied = false;
    } else if (this.wasCompleted) {
      _style = _crStyle(color, 0, '100%', T.OPACITY)
      this.wasCompleted = false;
      this.wasOpacied = true;
    } else {
       let { completed } = this.props;
       if (completed < 0) {
         completed = 0;
       } else if (completed >= 100) {
         completed = 100;
         this.wasCompleted = true
       }
       _style = _crStyle(color, 1, completed+'%', T.WIDTH)
    }

    return (
      <div className={CL} style={_style} />
    );
  }
}

export default ProgressLine
