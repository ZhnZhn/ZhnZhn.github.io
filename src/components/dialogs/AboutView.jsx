import Link from '../zhn/Link';

const CL_DESCR_DATASOURCE = "descr-datasource"
, S_DIV = { padding: 16 }
, S_DESCR = { marginTop: 16 };

const AboutView = ({
  aboutJson
}) => (
  <div className={CL_DESCR_DATASOURCE} style={S_DIV}>
    <Link href={aboutJson.href}>{aboutJson.provider}</Link>
    <p style={S_DESCR}>{aboutJson.descr}</p>
  </div>
);

export default AboutView
