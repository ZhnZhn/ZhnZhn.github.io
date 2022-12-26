
const Button = ({
  tabIndex,
  className,
  style,
  title,
  onClick,
  children
}) => (
  <button
    type="button"
    tabIndex={tabIndex}
    className={className}
    style={style}
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button
