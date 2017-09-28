const C = {
  BASE: 'http://fenixservices.fao.org/faostat/api/v1/en/data',
  TAIL: 'area_cs=FAO&item_cs=FAO&year=1980%2C1981%2C1982%2C1983%2C1984%2C1985%2C1986%2C1987%2C1988%2C1989%2C1990%2C1991%2C1992%2C1993%2C1994%2C1995%2C1996%2C1997%2C1998%2C1999%2C2000%2C2001%2C2002%2C2003%2C2004%2C2005%2C2006%2C2007%2C2008%2C2009%2C2010%2C2011%2C2012%2C2013%2C2014%2C2015&show_codes=true&show_unit=true&show_flags=true&null_values=false&output_type=json'
};

const FaoStatApi = {
  getRequestUrl(option){
    const { proxy, one, two, three, dfElement, dfDomain='QC' } = option
         , _element = three || dfElement;

    return `${proxy}${C.BASE}/${dfDomain}?element=${_element}&area=${one}&item=${two}&${C.TAIL}`;
  },

  checkResponse(json){
    return true;
  }
};

export default FaoStatApi
