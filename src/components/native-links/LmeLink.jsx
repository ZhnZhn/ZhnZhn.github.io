import Link from './Link'

const BASE_URL = 'https://www.lme.com/metals/non-ferrous/';
const LME = 'London Metal Exchange: '

const LmeLink = ({ item={} }) => {
  const { caption='' } = item
      , _path = String(caption)
                   .toLowerCase()
                   .replace(' ', '-');
  return (
      <Link
        caption={LME + caption}
        href={BASE_URL+_path}
      />
  );
}

export default LmeLink
