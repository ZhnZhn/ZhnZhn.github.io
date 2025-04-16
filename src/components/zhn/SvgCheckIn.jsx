import {
  Svg,
  PathCheckIn
} from './svg/Svg';

const CL_CHECK_IN = "check-in";

const SvgCheckIn = ({
  is,
  cn
}) => is ? (
  <span className={cn}>
    <Svg w="16">
      <PathCheckIn cn={CL_CHECK_IN} sw="3" />
    </Svg>
  </span>
) : null;

export default SvgCheckIn
