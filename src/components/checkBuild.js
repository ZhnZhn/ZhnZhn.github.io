
const checkBuild = (BUILD_DATE, reload) => {
  if (window.fetch) {
    fetch('./data/build.json', {cache: "no-cache"})
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Check build: Response ${res.status}`);
        }
      })
      .then(json => {
        const { build='' } = json;
        if (build !== BUILD_DATE && document.cookie.indexOf('erc') === -1) {
          reload({ buildDate: BUILD_DATE })
        }
      })
      .catch(err => {
        console.log(err.message)
      })
  }
};

export default checkBuild
