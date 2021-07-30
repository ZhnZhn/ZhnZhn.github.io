import crCn from '../zhn-utils/crCn';

const CL = 'bt-circle bt-c2 not-selected';

const ButtonCircle2 = ({
  tabIndex,
  className, style, dataLoader,
  caption='',
  onClick
}) => (
  <button
     tabIndex={tabIndex}
     className={crCn(CL, className)}
     style={style}
     data-loader={dataLoader}
     onClick={onClick}
  >
    <div>
      {caption}
    </div>
  </button>
);

export default ButtonCircle2
