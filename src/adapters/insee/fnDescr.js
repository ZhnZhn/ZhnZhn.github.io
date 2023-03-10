import {
  CL_PR_8,
  CL_BLACK,
  CL_DARK_BLUE
} from '../CL';

const _crPropName = (
  title
) => title[0].toLowerCase() + title.slice(1);

const _crSpan = (
  title,
  seria,
  value
) => `<span class="${CL_PR_8}">
  <span class="${CL_DARK_BLUE}">${title}:&nbsp;</span>
  <span>${value == null ? seria[_crPropName(title)] : value}</span>
</span>`;

export const crInfo = (
  title,
  subtitle,
  seriesParams
) => ({
   name: subtitle
     ? title + ': ' + subtitle
     : title,
   description: seriesParams
     .reduce((
       strDom,
       seria
     ) => `${strDom}
       <div class="${CL_BLACK}">${seria.title}</div>
       <div>
         ${_crSpan('IDBANK', seria, seria.id)}
         ${_crSpan('Frequency', seria)}
         ${_crSpan('UpdatedOn', seria)}
       </div>
       <div>
         ${_crSpan('UnitMeasure', seria)}
         ${_crSpan('UnitMult', seria)}
       </div>
       <div>
         <a href="https://www.insee.fr/en/statistiques/serie/${seria.id}">INSEE Data Link</a>
       </div>
       <br/>
    `, '')
})
