import { crPresentationRole } from '../a11yFn';
import { crShowHide } from '../styleFn';

const ShowHide = (props) => {
    const [
      _cn,
      _style
    ] = crShowHide(
      props.isShow,
      props.className,
      props.withoutAnimation,
      props.animationClass
    );

    /*eslint-disable jsx-a11y/no-static-element-interactions*/
    return (
      <div
        {...crPresentationRole(props.isShow)}
        className={_cn}
        style={{...props.style, ..._style}}
        onKeyDown={props.onKeyDown}
      >
        {props.children}
      </div>
    );
    /*eslint-enable jsx-a11y/no-static-element-interactions*/
 };


export default ShowHide
