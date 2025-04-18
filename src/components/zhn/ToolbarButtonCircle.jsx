import ButtonCircle from './ButtonCircle';

const S_TOOLBAR = {
  display: 'flex',
  alignItems: 'center',
  padding: '6px 5px'
}
, S_BUTTON_CIRCLE = {
  marginLeft: 20
};

export const crToolbarButton = (
  caption,
  title,
  onClick
) => (
  <ButtonCircle
    key={caption}
    style={S_BUTTON_CIRCLE}
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
