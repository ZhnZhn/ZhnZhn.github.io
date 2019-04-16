import React from 'react'

import ArrowCell from './ArrowCell'

const CL = {
  SPINNER: 'zhn-search__spinner',
  SPINNER_FAILED: 'zhn-select__spinner--failed'
};
const S = {
  ARROW_SHOW: {
    borderColor: '#1b75bb transparent transparent'
  }
};

const _loadingEl = (<span
  className={CL.SPINNER}
  data-loader="circle"
/>);
const _loadingFailedEl = (<span
  className={CL.SPINNER_FAILED}
  data-loader="circle-failed"
/>);

const ToggleButton = ({
  isLoading, isLoadingFailed,
  options, isOptions, toggleOptions
}) => {
  if (isLoading) {
    return _loadingEl;
  } else if (isLoadingFailed) {
    return _loadingFailedEl;
  } else if (options && options.length > 0) {
    return (
      <ArrowCell
        arrowStyle={isOptions ? S.ARROW_SHOW : null}
        onClick={toggleOptions}
      />
    );
   }
   return null;
};


export default ToggleButton
