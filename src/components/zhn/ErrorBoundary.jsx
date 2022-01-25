import { Component } from 'react';

const FN_NOOP = () => {};

class ErrorBoundary extends Component {

  static defaultProps = {
    onError: FN_NOOP
  }
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errMsg){
    this.props.onError()
  }

  render(){
    const { hasError } = this.state
    , { FallbackComp, children } = this.props;
    return hasError
      ? FallbackComp
      : children;
  }
}

export default ErrorBoundary
