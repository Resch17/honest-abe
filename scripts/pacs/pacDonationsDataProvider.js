let pacDonations = [];

export const getPacDonations = () => {
  return fetch('http://localhost:8088/pacdonations')
    .then((res) => res.json())
    .then((parsed) => {
      pacDonations = parsed;
    });
};

export const usePacDonations = () => pacDonations.slice();
