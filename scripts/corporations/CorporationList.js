import { Corporation } from './Corporation.js';
import { getCorporations, useCorporations } from './corporationDataProvider.js';

const contentTarget = document.querySelector('.corporations');

export const CorporationList = () => {
  getCorporations().then(() => {
    const corporations = useCorporations();
    contentTarget.innerHTML = corporations
      .map((corp) => Corporation(corp))
      .join('');
  });
};
