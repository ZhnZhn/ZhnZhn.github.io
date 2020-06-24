
const STYLE = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#e1e1cb',
    width: 250
  },
  INPUT : {
    background: 'transparent none repeat scroll 0 0',
    color: 'green',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    border: 'medium none',
    outline: 'medium none',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  HR : {    
    width: 'auto',
    //width: '90%'
    //width: '230px'
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 'medium medium 1px',
    borderStyle: 'none none solid',
    borderColor: 'red',
    borderImage: 'none',
  },
  HR_VALID : {
     borderColor: '#1b75bb'
  },
  HR_NOT_VALID : {
     borderColor: '#f44336'
  },
  ERR_MSG : {
    color: '#f44336',
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: '12px',
    fontWeight: 'bold'
  }
};

export default STYLE
