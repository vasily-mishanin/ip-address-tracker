export function locationDataItem(
  title: string,
  value: string,
  country?: string,
  region?: string
) {
  if (country && region) {
    value = `${country}, ${region}, ${value} `;
  }
  return `<li class='location-data-item'>
  <p class='location-data-item-title'>${title.toUpperCase()}</p>
  <p class='location-data-item-value'>${value}</p>
  </li>`;
}
