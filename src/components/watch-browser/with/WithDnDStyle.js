
const BORDER = 'border' // dragStart
    , BORDER_BOTTOM = 'border-bottom' // backup
    , BORDER_LEFT = 'border-left' // dragEnter
    //, START_BORDER_STYLE = "1px solid yellow"
    , ENTER_BORDER_LEFT_STYLE = "4px solid green"
    , ENTER_BORDER_LEFT_STYLE_DENY = "4px solid red";

let sourcePermissions
  , nodeDragTarget
  , borderBottom
  , borderLeftEnter;

const WithDnDStyle = {

   dragStartWithDnDStyle(ev, permissions){
      ev.persist();
      nodeDragTarget = ev.currentTarget;

      const style = nodeDragTarget.style;
      borderBottom = style.getPropertyValue(BORDER_BOTTOM);
      //style.setProperty(BORDER, START_BORDER_STYLE);

      sourcePermissions = permissions;
   },
   dropWithDnDStyle(ev){
      const styleTarget = nodeDragTarget.style
          , styleSource = ev.currentTarget.style;
      styleSource.removeProperty(BORDER_LEFT);
      styleTarget.removeProperty(BORDER);
      styleTarget.setProperty(BORDER_BOTTOM, borderBottom);
   },

   dragEnterWithDnDStyle(ev, sourceType){
      const style = ev.currentTarget.style
      borderLeftEnter = style.getPropertyValue(BORDER_LEFT);

      /* eslint-disable no-unused-expressions */
      ( sourcePermissions.indexOf(sourceType) !== -1 )
         ? style.setProperty(BORDER_LEFT, ENTER_BORDER_LEFT_STYLE)
         : style.setProperty(BORDER_LEFT, ENTER_BORDER_LEFT_STYLE_DENY);
      /* eslint-disable no-unused-expressions */

   },

   dragLeaveWithDnDStyle(ev){
      const style = ev.currentTarget.style
      style.removeProperty(BORDER_LEFT);
      style.setProperty(BORDER_LEFT, borderLeftEnter);
   }

};

export default WithDnDStyle
