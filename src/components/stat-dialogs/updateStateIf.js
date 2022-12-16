const udpdateStateIf = (
  setState,
  propName,
  propValue
) => {
  setState(prevState => {
    if (prevState[propName] !== propValue) {
      prevState[propName] = propValue
      return {...prevState};
    }
    return prevState;
  })
};

export default udpdateStateIf
