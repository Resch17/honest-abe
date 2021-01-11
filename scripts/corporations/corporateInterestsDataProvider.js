let corporateInterests = [];

export const getCorporateInterests = () => {
  return fetch('http://localhost:8088/corporateinterests')
    .then((res) => res.json())
    .then((parsed) => {
      corporateInterests = parsed;
    });
};

export const useCorporateInterests = () => corporateInterests.slice();
