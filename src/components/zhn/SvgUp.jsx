const CL = {
  ROOT: 'svg-move',
  SVG: 'svg-move__svg svg-up'
};

const SvgUp = () => (
   <span className={CL.ROOT}>
     <svg viewBox="0 0 12 12" width="100%" height="100%"
          className={CL.SVG}
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0,12 L 6,8 11,12 6,0 0,12" />
     </svg>
   </span>
)

export default SvgUp
