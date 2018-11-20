

//not actually attaching this, just for reference.
let defaultLocation=null
if (!_.isEmpty(localStorage.getItem('defaultLocation')))
  defaultLocation=JSON.parse(localStorage.getItem('defaultLocation') || {locationCode:null}).code;
