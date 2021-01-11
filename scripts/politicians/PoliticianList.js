import { Politician } from './Politician.js';
import { getPoliticians, usePoliticians } from './politicianDataProvider.js';

const contentTarget = document.querySelector('.politicians');

export const PoliticianList = () => {
  getPoliticians().then(() => {
    const politicians = usePoliticians();
    contentTarget.innerHTML = politicians
      .map((pol) => Politician(pol))
      .join('');
  });
};
