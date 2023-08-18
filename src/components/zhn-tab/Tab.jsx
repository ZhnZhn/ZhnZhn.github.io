const Tab = ({
  className,
  tabId,
  tabPanelId,
  title,
  isSelected,
  onClick,
  onKeyDown
}) => (
  <button
    type="button"
    role="tab"
    className={className}
    id={tabId}
    tabIndex={isSelected ? '0' : '-1'}
    aria-selected={isSelected}
    aria-controls={tabPanelId}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {title}
  </button>
);

export default Tab
