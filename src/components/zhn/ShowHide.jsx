import { crPresentationRole } from '../a11yFn';
import { crShowHide } from '../styleFn';

const ShowHide = ({
  isShow,
  className,
  style,
  withoutAnimation,
  animationClass,
  onKeyDown,
  children
}) => {
    const [
      _cn,
      _style
    ] = crShowHide(
      isShow,
      className,
      withoutAnimation,
      animationClass
    );

    /*eslint-disable jsx-a11y/no-static-element-interactions*/
    return (
      <div
        {...crPresentationRole(isShow)}
        className={_cn}
        style={{...style, ..._style}}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    );
    /*eslint-enable jsx-a11y/no-static-element-interactions*/
 };


export default ShowHide
