import { getCorporateDonations } from '../corporations/corporateDonationsDataProvider.js';
import { Pac } from './Pac.js';
import { getPacs, usePacs } from './pacDataProvider.js';

const contentTarget = document.querySelector('.pacs');

export const PacList = () => {
  getPacs()
    .then(getCorporateDonations)
    .then(() => {
      const pacs = usePacs();
      contentTarget.innerHTML = pacs.map((pac) => Pac(pac)).join('');
    });
};
