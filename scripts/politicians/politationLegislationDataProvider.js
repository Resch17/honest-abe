let polBills = [];

export const getPoliticianLegislation = () => {
  return fetch('http://localhost:8088/politicianlegislations')
    .then((res) => res.json())
    .then((parsed) => {
      polBills = parsed;
    });
};

export const usePoliticianLegislation = () => polBills.slice();
