let interests = [];

export const getInterests = () => {
  return fetch('http://localhost:8088/interests')
    .then((res) => res.json())
    .then((parsed) => {
      interests = parsed;
    });
};

export const useInterests = () => interests.slice();
