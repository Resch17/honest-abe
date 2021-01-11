let corporations = [];

export const getCorporations = () => {
  return fetch('http://localhost:8088/corporations')
    .then((res) => res.json())
    .then((parsed) => {
      corporations = parsed;
    });
};

export const useCorporations = () => corporations.slice();
