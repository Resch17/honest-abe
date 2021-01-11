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

  const sponsoredBillObjects = sponsoredBills.map((rel) => {
    return legislation.find((bill) => bill.id === rel.legislationId);
  });

  const relevantInterests = interests.filter((interest) => {
    return sponsoredBillObjects.find((rel) => rel.interestId === interest.id);
  });

  const companiesWithRelevantInterestsRel = relevantInterests.map(
    (interest) => {
      return corporateInterests.find((rel) => rel.interestId === interest.id);
    }
  );

  const companiesWithRelevantInterests = companiesWithRelevantInterestsRel.map(
    (rel) => {
      return corporations.find((corp) => corp.id === rel.corporationId);
    }
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

  const relatedPacs = pacDonations.filter(
    (d) => d.politicianId === politician.id
  );

  const relatedPacObjects = relatedPacs.map((rel) => {
    return pacs.find((pac) => pac.id === rel.pacId);
  });

  const companyPacRels = relatedPacObjects.map((pac) => {
    return corporateDonations.find((rel) => rel.pacId === pac.id);
  });

  const pacCompanies = companyPacRels.map((rel) => {
    return corporations.find((corp) => corp.id === rel.corporationId);
  });

  const influencingCorporationsHtml = () => {

    // match companies that share interests with pol (via bill topics) that have routed money to this pol thru PACs
    const corpList = pacCompanies.filter((pacC) => {
      return companiesWithRelevantInterests.find((c) => c.id === pacC.id);
    });
    if (corpList.length > 0) {
      const duplicatesRemoved = corpList.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      return duplicatesRemoved
        .sort((a, b) => a.company.localeCompare(b.company))
        .map((c) => `<li>${c.company}</li>`)
        .join('');
    } else {
      return `<li>No corporate influences found.</li>`;
    }
  };

  const relatedPacNamesHtml = () => {
    if (relatedPacs.length > 0) {
      const duplicatesRemoved = relatedPacObjects.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );

      return duplicatesRemoved
        .sort((a, b) => a.registeredName.localeCompare(b.registeredName))
        .map((p) => `<li>${p.registeredName}</li>`)
        .join('');
    } else {
      return `<li>No related PACs found.</li>`;
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
      <ul>${relatedPacNamesHtml()}</ul>
    </div>
    <div class="politician__influencers">
      <h3>Influencing Corporations</h3>
      <ul>${influencingCorporationsHtml()}</ul>
    </div>
  </section>
  `;
};
