export const Corporation = (corp) => {
  return `
  <section class="corporation">
    <header class="corporation__name">
      <h1>${corp.company}</h1>
    </header>
    <div class="corporation__info">
      <div>Address: ${corp.address}</div>
    </div>
  </section>
  `;
};
