
const Button = ({
  children,
  ...restProps
}) => (
  <button
    {...restProps}
    type="button"
  >
    {children}
  </button>
);

export default Button
