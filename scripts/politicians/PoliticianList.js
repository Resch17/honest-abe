import { getPoliticians, usePoliticians } from './politicianDataProvider.js';
import { getInterests } from '../misc/interestDataProvider.js';
import { getPacs } from '../pacs/pacDataProvider.js';
import { getCorporations } from '../corporations/corporationDataProvider.js';
import { getLegislation } from '../misc/legislationDataProvider.js';
import { getPoliticianLegislation } from './politationLegislationDataProvider.js';
import { getPacDonations } from '../pacs/pacDonationsDataProvider.js';
import { getCorporateInterests } from '../corporations/corporateInterestsDataProvider.js';
import { getCorporateDonations } from '../corporations/corporateDonationsDataProvider.js';
import { Politician } from './Politician.js';

const contentTarget = document.querySelector('.politicians');

const promises = [
  getPoliticians(),
  getInterests(),
  getPacs(),
  getCorporations(),
  getLegislation(),
  getPoliticianLegislation(),
  getPacDonations(),
  getCorporateInterests(),
  getCorporateDonations(),
];

export const PoliticianList = () => {
  Promise.all(promises).then(() => {
    const politicians = usePoliticians();
    contentTarget.innerHTML = politicians
      .map((pol) => Politician(pol))
      .join('');
  });
};
