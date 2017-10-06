
const S = {
  ROOT: 'style="display:inline-block;padding-right:8px;"',
  TITLE: 'style="color:#1b75bb;"'
};

const _crSpan = (title, value) => {
  return `
   <span ${S.ROOT}>
     <span ${S.TITLE}>${title}:&nbsp;</span>
     <span>${value}</span>
   </span>
  `;
};

const fnDescr = {
  toInfo(info, title){
    let strDom='';
    info.forEach(seria => {
      const {
              title, id, updatedOn,
              frequency, unitMeasure, unitMult
            } = seria;
      strDom += `
        <div style="color:black;">${title}</div>
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
      description: strDom
    };
  }
}

export default fnDescr
