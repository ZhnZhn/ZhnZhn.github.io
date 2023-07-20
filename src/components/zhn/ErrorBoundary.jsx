import { Component } from '../uiApi';

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
    const {
      FallbackComp,
      children
    } = this.props;
    return this.state.hasError
      ? FallbackComp
      : children;
  }
}

export default ErrorBoundary
