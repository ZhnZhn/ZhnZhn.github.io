import {
  CL_PR_8,
  CL_BLACK,
  CL_DARK_BLUE
} from '../CL';

const _crSpan = (
  title,
  value
) => `
 <span class="${CL_PR_8}">
  <span class="${CL_DARK_BLUE}">${title}:&nbsp;</span>
  <span>${value}</span>
 </span>
`;

const fnDescr = {
  toInfo(info, title){
    let _strDom='';
    info.forEach(seria => {
      const {
        title,
        id,
        updatedOn,
        frequency,
        unitMeasure,
        unitMult
      } = seria;
      _strDom += `
        <div class="${CL_BLACK}">${title}</div>
        <div>
          ${_crSpan('IDBANK', id)}
          ${_crSpan('Frequency', frequency)}
          ${_crSpan('UpdatedOn', updatedOn)}
        </div>
        <div>
          ${_crSpan('UnitMeasure', unitMeasure)}
          ${_crSpan('UnitMult', unitMult)}
        </div>
        <div>
          <a href="https://www.insee.fr/en/statistiques/serie/${id}">INSEE Data Link</a>
        </div>
        <br/>
      `
    })
    return {
      name: title,
      description: _strDom
    };
  }
}

export default fnDescr
