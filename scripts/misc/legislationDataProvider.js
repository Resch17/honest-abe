let legislation = [];

export const getLegislation = () => {
  return fetch('http://localhost:8088/legislations')
    .then((res) => res.json())
    .then((parsed) => {
      legislation = parsed;
    });
};

export const useLegislation = () => legislation.slice();
