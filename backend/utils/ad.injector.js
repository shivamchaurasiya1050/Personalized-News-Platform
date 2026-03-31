exports.injectAds = (articles, ads) => {
  let res = [];
  let i = 0;

  articles.forEach((a, idx) => {
    res.push(a);

    if ((idx + 1) % 5 === 0 && ads.length) {
      res.push({ type: "ad", data: ads[i % ads.length] });
      i++;
    }
  });

  return res;
};