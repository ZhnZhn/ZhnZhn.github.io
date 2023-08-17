import { crShowHide } from '../styleFn';

const ShowHide = ({
  isShow,
  className,
  style,
  withoutAnimation,
  animationClass,
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
    
    return (
      <div
        aria-expanded={isShow}
        className={_cn}
        style={{...style, ..._style}}
      >
        {children}
      </div>
    );
 };


export default ShowHide
