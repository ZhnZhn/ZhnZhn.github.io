import ArrowCell from './ArrowCell';

const CL_SPINNER = 'zhn-search__spinner'
, CL_SPINNER_FAILED = 'zhn-select__spinner--failed'
, S_ARROW_SHOW = {
  borderColor: '#1b75bb transparent transparent'
}
, _LOADING_ELEMENT = (<span
  className={CL_SPINNER}
  data-loader="circle"
/>)
, _LOADING_FAILED_ELEMENT = (<span
  className={CL_SPINNER_FAILED}
  data-loader="circle-failed"
/>);

const ToggleButton = ({
  isLoading,
  isLoadingFailed,
  options,
  isOptions,
  toggleOptions
}) => isLoading
  ? _LOADING_ELEMENT
  : isLoadingFailed
    ? _LOADING_FAILED_ELEMENT
    : options && options.length > 0
      ? (<ArrowCell
            arrowStyle={isOptions ? S_ARROW_SHOW : null}
            onClick={toggleOptions}
         />)
      : null;

export default ToggleButton
