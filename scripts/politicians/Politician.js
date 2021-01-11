import { usePacDonations } from '../pacs/pacDonationsDataProvider.js';
import { usePacs } from '../pacs/pacDataProvider.js';

export const Politician = (politician) => {
  const pacs = usePacs();
  const donations = usePacDonations();

  const donationsToThisPol = donations.filter(
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
      return `<li>No PAC Donations Found</li>`
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
    <div class="politician__pac-donations">
      <h2>PAC Donations</h2>
      <ul>${donationsHtml()}</ul>
    </div>
  </section>
  `;
};
