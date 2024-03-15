
const Button = ({
  ariaLabel,
  tabIndex,
  className,
  style,
  title,
  dataLoader,
  onClick,
  children
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    tabIndex={tabIndex}
    className={className}
    style={style}
    title={title}
    data-loader={dataLoader}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button
