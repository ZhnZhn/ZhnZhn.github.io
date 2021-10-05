import Svg100 from './Svg100';

const S_SVG = { padding: 3 };

const SvgX = () => (
  <Svg100
    w="12"
    style={S_SVG}
    strokeWidth="2"
    strokeLinecap="round"
   >
     <path d="M 0,0 L 12,12" />
     <path d="M 12,0 L 0,12" />
  </Svg100>
);

export default SvgX
