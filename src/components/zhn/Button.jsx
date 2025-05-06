
const Button = ({
  ariaLabel,
  children,
  ...restProps
}) => (
  <button
    {...restProps}
    aria-label={ariaLabel}
    type="button"
  >
    {children}
  </button>
);

export default Button
