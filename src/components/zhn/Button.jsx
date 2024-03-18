
const Button = ({
  ariaLabel,
  dataLoader,
  children,
  ...restProps
}) => (
  <button
    {...restProps}
    data-loader={dataLoader}
    aria-label={ariaLabel}
    type="button"
  >
    {children}
  </button>
);

export default Button
