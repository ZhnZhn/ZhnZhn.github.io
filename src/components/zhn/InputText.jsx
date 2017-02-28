import React, { Component, PropTypes } from 'react';

const S = {
  INPUT_TEXT : {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor : '#E1E1CB',
    marginLeft : '5px',
    marginRight : '5px',
    display : 'inline'
  }
}


class InputText extends Component {
  static propTypes = {
    initValue : PropTypes.string,
    style : PropTypes.object
  }
  static defaultProps = {
    initValue : ''
  }

  constructor(props){
    super();
    this.state = {
      value : props.initValue
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props){
      this.setState({ value : nextProps.initValue });
    }
  }

  _handleInputChange = (event) => {
    this.setState({ value : event.target.value })
  }

  render(){
    const {style} = this.props
        , {value} = this.state;
    return (
      <input
        name="text"
        autoComplete="new-text"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        type="text"
        style={Object.assign({}, S.INPUT_TEXT, style)}
        value={value}
        translate={false}
        onChange={this._handleInputChange}
      />
    )
  }

  getValue = () => {
    return this.state.value;
  }
  setValue = (value) => {
    this.setState({value})
  }
}

export default InputText
