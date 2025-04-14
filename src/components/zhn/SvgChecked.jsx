import Svg from './svg/Svg';

const CL_CHECK_IN = "check-in";

const SvgChecked = ({
  className
}) => (
  <span className={className}>
    <Svg w="16">
      <path
        className={CL_CHECK_IN}
        d="M 2,5 L 8,14 14,1"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  </span>
);

export default SvgChecked
