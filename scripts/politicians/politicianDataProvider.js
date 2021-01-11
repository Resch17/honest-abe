let politicians = [];

export const getPoliticians = () => {
  return fetch('http://localhost:8088/politicians')
    .then((res) => res.json())
    .then((parsed) => {
      politicians = parsed;
    });
};

export const usePoliticians = () => politicians.slice();
