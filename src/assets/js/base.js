statusUpdateTime = (data) => {
  if (data != null) {
    let a = data.split(',');
    return getLocalTime(a[a.length - 1]);
  }

};

getLocalTime = (nS) => {
  return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
};
