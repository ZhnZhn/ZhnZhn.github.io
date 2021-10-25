import ArrowCell from './ArrowCell';

const CL_SPINNER = 'zhn-search__spinner'
, CL_SPINNER_FAILED = 'zhn-select__spinner--failed'
, S_ARROW_SHOW = {
  borderColor: '#1b75bb transparent transparent'
};

const _loadingEl = (<span
  className={CL_SPINNER}
  data-loader="circle"
/>);
const _loadingFailedEl = (<span
  className={CL_SPINNER_FAILED}
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
        arrowStyle={isOptions ? S_ARROW_SHOW : null}
        onClick={toggleOptions}
      />
    );
   }
   return null;
};

export default ToggleButton
