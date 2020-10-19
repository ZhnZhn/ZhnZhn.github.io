const CL = 'zhn-bt-circle2';

const ButtonCircle2 = ({
  tabIndex,
  className='', style, dataLoader,
  caption='', onClick,
}) => (
  <button
     tabIndex={tabIndex}
     className={`${CL} ${className}`}
     style={style}
     onClick={onClick}
     data-loader={dataLoader}
  >
    <div>
      {caption}
    </div>
  </button>
);

export default ButtonCircle2
