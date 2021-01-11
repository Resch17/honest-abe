let pacs = [];

export const getPacs = () => {
  return fetch('http://localhost:8088/pacs')
    .then((res) => res.json())
    .then((parsed) => {
      pacs = parsed;
    });
};

export const usePacs = () => pacs.slice();
