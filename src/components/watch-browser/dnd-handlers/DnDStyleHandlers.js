const BORDER = 'border' // dragStart
, BORDER_BOTTOM = 'border-bottom' // backup
, BORDER_LEFT = 'border-left' // dragEnter
, DF_COLOR_PERMITTED = 'green'
, COLOR_NOT_PERMITTED = 'red';

let sourcePermissions
, nodeDragTarget
, borderBottomStyle
, borderLeftPreEnterStyle;

const _getStyle = ev => ev.currentTarget.style;
const _crBorderStyle = (
  borderColor
) => `4px solid ${borderColor}`;
const _hasPermissionToAdd = (
  sourceType
) => sourcePermissions.indexOf(sourceType) !== -1;

const _crBorderLeftEnterStyle = (
  sourceType,
  borderColor
) => _crBorderStyle(_hasPermissionToAdd(sourceType)
  ? borderColor || DF_COLOR_PERMITTED
  : COLOR_NOT_PERMITTED
);

export const dragStartWithDnDStyle = (
  event,
  permissions
) => {
  nodeDragTarget = event.currentTarget
  sourcePermissions = permissions
  borderBottomStyle = _getStyle(event)
    .getPropertyValue(BORDER_BOTTOM)
};

export const dropWithDnDStyle = event => {
  const styleTarget = nodeDragTarget.style
  , styleSource = _getStyle(event);

  styleSource.removeProperty(BORDER_LEFT)
  styleTarget.removeProperty(BORDER)
  styleTarget.setProperty(BORDER_BOTTOM, borderBottomStyle)
};

export const dragEnterWithDnDStyle = (
  event,
  sourceType,
  borderColor
) => {
  const style = _getStyle(event);

  borderLeftPreEnterStyle = style.getPropertyValue(BORDER_LEFT)
  style.setProperty(
    BORDER_LEFT,
    _crBorderLeftEnterStyle(sourceType, borderColor)
  )
};

export const dragLeaveWithDnDStyle = event => {
  const style = _getStyle(event);

  style.removeProperty(BORDER_LEFT)
  style.setProperty(BORDER_LEFT, borderLeftPreEnterStyle)
};
