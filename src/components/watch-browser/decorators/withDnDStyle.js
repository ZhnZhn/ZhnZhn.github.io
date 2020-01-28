
const BORDER = 'border' // dragStart
    , BORDER_BOTTOM = 'border-bottom' // backup
    , BORDER_LEFT = 'border-left' // dragEnter
    //, START_BORDER_STYLE = "1px solid yellow"
    //, ENTER_BORDER_LEFT_STYLE = "4px solid #1b2836"
    //, ENTER_BORDER_LEFT_STYLE = "4px solid green"
    , ENTER_BORDER_LEFT_STYLE_DENY = "4px solid red";

let sourcePermissions
  , nodeDragTarget
  , borderBottom
  , borderLeftEnter;

const _crEnterBorderLeftStyle =
  (borderColor="green") => `4px solid ${borderColor}`;

const dragStartWithDnDStyle = function(ev, permissions){
  ev.persist()
  nodeDragTarget = ev.currentTarget

  const style = ev.currentTarget.style;
  borderBottom = style.getPropertyValue(BORDER_BOTTOM)
  //style.setProperty(BORDER, START_BORDER_STYLE);

  sourcePermissions = permissions
};
const dropWithDnDStyle = function(ev){
  const styleTarget = nodeDragTarget.style
      , styleSource = ev.currentTarget.style;
  styleSource.removeProperty(BORDER_LEFT)
  styleTarget.removeProperty(BORDER)
  styleTarget.setProperty(BORDER_BOTTOM, borderBottom)
};
const dragEnterWithDnDStyle = function(ev, sourceType, borderColor){
  const style = ev.currentTarget.style;
  borderLeftEnter = style.getPropertyValue(BORDER_LEFT)

  if (sourcePermissions.indexOf(sourceType) !== -1) {
    //style.setProperty(BORDER_LEFT, ENTER_BORDER_LEFT_STYLE)
    style.setProperty(BORDER_LEFT, _crEnterBorderLeftStyle(borderColor))
  } else {
    style.setProperty(BORDER_LEFT, ENTER_BORDER_LEFT_STYLE_DENY)
  }
};
const dragLeaveWithDnDStyle = function(ev){
  const style = ev.currentTarget.style;
  style.removeProperty(BORDER_LEFT)
  style.setProperty(BORDER_LEFT, borderLeftEnter)
};

const withDnDStyle = (target) => {
  Object.assign(target.prototype, {
    dragStartWithDnDStyle: dragStartWithDnDStyle,
    dropWithDnDStyle: dropWithDnDStyle,
    dragEnterWithDnDStyle: dragEnterWithDnDStyle,
    dragLeaveWithDnDStyle: dragLeaveWithDnDStyle,
  })
}

export default withDnDStyle
