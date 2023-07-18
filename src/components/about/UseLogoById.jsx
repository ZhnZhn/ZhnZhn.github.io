
const PATH_TO_SVG_SPRITE = 'css/sprite.svg';

const UseLogoById = ({
  id
}) => (
  <use href={`${PATH_TO_SVG_SPRITE}#${id}Logo`} />
)

export default UseLogoById
