import { S_FLEX } from '../styleFn';

import ButtonCircle from './ButtonCircle';

const S_TOOLBAR = {
  ...S_FLEX,
  padding: 6,
  gap: 6
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

export const ToolbarButtonCircle = (props) => (
  <div
    style={{...S_TOOLBAR, ...props.style}}
    role="toolbar"
  >
    {props.children}
  </div>
)
