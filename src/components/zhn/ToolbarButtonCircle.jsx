import { S_FLEX } from '../styleFn';

import ButtonCircle from './ButtonCircle';

const S_SVG_TOOLBAR = {
  ...S_FLEX,
  padding: 6,
  gap: 6
};

const S_BT_TOOLBAR = {
  ...S_FLEX,
  padding: "6px 5px 6px 15px",
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

const _fToolbar = style => props => (
  <div
    style={{...style, ...props.style}}
    role="toolbar"
  >
    {props.children}
  </div>
)

export const ToolbarButtonSvg = _fToolbar(S_SVG_TOOLBAR)
export const ToolbarButtonCircle = _fToolbar(S_BT_TOOLBAR)
