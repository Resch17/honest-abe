import { getPacs } from '../pacs/pacDataProvider.js';
import { getPacDonations } from '../pacs/pacDonationsDataProvider.js';
import { Politician } from './Politician.js';
import { getPoliticians, usePoliticians } from './politicianDataProvider.js';

const contentTarget = document.querySelector('.politicians');

export const PoliticianList = () => {
  getPoliticians()
    .then(getPacs)
    .then(getPacDonations)
    .then(() => {
      const politicians = usePoliticians();
      contentTarget.innerHTML = politicians
        .map((pol) => Politician(pol))
        .join('');
    });
};
