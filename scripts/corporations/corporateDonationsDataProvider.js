let corporateDonations = [];

export const getCorporateDonations = () => {
  return fetch('http://localhost:8088/corporatedonations')
    .then((res) => res.json())
    .then((parsed) => {
      corporateDonations = parsed;
    });
};

export const useCorporateDonations = () => corporateDonations.slice();
