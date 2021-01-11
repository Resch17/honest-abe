import { useCorporateDonations } from '../corporations/corporateDonationsDataProvider.js';
import { useCorporations } from '../corporations/corporationDataProvider.js';

export const Pac = (pac) => {
  const corporations = useCorporations();
  const donations = useCorporateDonations();

  const donationsReceived = donations.filter((d) => d.pacId === pac.id);

  const donationsHtml = donationsReceived
    .map((donation) => {
      const company = corporations.find((c) => c.id === donation.corporationId);

      return `
    <li>${company.company} ($${donation.amount})</li>
    `;
    })
    .join('');

  return `
  <section class="pac">
    <header>
      <h1>${pac.registeredName}</h1>
    </header>
    <div class="pac__info">
      <div>${pac.address}</div>
    </div>
    <div class="pac__donors">
      <h2>Donors</h2>
      <ul>${donationsHtml}</ul>
    </div>
  </section>
  `;
};
