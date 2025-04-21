import ButtonCircle from './ButtonCircle';

const S_TOOLBAR = {
  display: 'flex',
  padding: '6px 5px 6px 15px',
  gap: 15
};

export const crToolbarButton = (
  caption,
  title,
  onClick
) => (
  <ButtonCircle
    key={caption}
    caption={caption}
    title={title}
    onClick={onClick}
  />
)

export const ToolbarButtonCircle = ({
  style,
  children
}) => (
  <div style={{...S_TOOLBAR, ...style}} role="toolbar">
    {children}
  </div>
)
