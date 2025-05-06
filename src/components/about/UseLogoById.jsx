
const PATH_TO_SVG_SPRITE = 'css/sprite.svg';

const UseLogoById = (props) => (
  <use href={`${PATH_TO_SVG_SPRITE}#${props.id}Logo`} />
)

export default UseLogoById
