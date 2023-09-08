
const Button = ({
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
