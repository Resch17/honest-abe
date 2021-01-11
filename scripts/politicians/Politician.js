import { useInterests } from '../misc/interestDataProvider.js';
import { usePacs } from '../pacs/pacDataProvider.js';
import { useCorporations } from '../corporations/corporationDataProvider.js';
import { usePacDonations } from '../pacs/pacDonationsDataProvider.js';
import { useLegislation } from '../misc/legislationDataProvider.js';
import { usePoliticianLegislation } from './politationLegislationDataProvider.js';
import { useCorporateInterests } from '../corporations/corporateInterestsDataProvider.js';
import { useCorporateDonations } from '../corporations/corporateDonationsDataProvider.js';

export const Politician = (politician) => {
  const legislation = useLegislation();
  const interests = useInterests();
  const pacs = usePacs();
  const corporations = useCorporations();
  const polBills = usePoliticianLegislation();
  const pacDonations = usePacDonations();
  const corporateInterests = useCorporateInterests();
  const corporateDonations = useCorporateDonations();

  const sponsoredBills = polBills.filter(
    (rel) => rel.politicianId === politician.id
  );

  const billsHtml = () => {
    if (sponsoredBills.length > 0) {
      return sponsoredBills
        .map((rel) => {
          let thisBill = legislation.find(
            (bill) => bill.id === rel.legislationId
          );
          let thisBillInterest = interests.find(
            (i) => i.id === thisBill.interestId
          );
          return `<div>${thisBill.name} (Interest: ${thisBillInterest.about})</div>`;
        })
        .join('');
    } else {
      return `<div>No Sponsored Legislation Found</div>`;
    }
  };

  const donationsToThisPol = pacDonations.filter(
    (d) => d.politicianId === politician.id
  );

  const donationsHtml = () => {
    if (donationsToThisPol.length > 0) {
      return donationsToThisPol
        .map((donation) => {
          const pac = pacs.find((p) => p.id === donation.pacId);

          return `
        <li>${pac.registeredName} ($${donation.amount})</li>
        `;
        })
        .join('');
    } else {
      return `<li>No PAC Donations Found</li>`;
    }
  };

  return `
  <section class="politician">
    <header class="politician__name">
      <h1>${politician.name.first} ${politician.name.last}</h1>
    </header>
    <div class="politician__info">
      <div>Age: ${politician.age}</div>
      <div>Represents: ${politician.district}</div>
    </div>
    <div class="politician__bills">
      <h2>Sponsored Bills</h2>
      ${billsHtml()}
    </div>
    <div class="politician__funders">
      <h2>Related PACs</h2>
      <ul></ul>
      </div>
      <div class="politician__influencers">
      <h3>Influencing Corporations</h3>
      <ul></ul>
    </div>
  </section>
  `;
};
