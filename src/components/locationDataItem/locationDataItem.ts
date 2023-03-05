import "./locationDataItem.css";

export function locationDataItem(
  title: string,
  value: string,
  country?: string,
  region?: string
) {
  if (country && region) {
    value = `${country}, ${region}, ${value} `;
  }
  if (title === "timezone") {
    value = "UTC" + value;
  }
  return `<li class='location-data-item'>
  <div class='location-data-item-content-wrapper'>
  <p class='location-data-item-title'>${title.toUpperCase()}</p>
  <p class='location-data-item-value'>${value}</p>
  </div>
  </li>`;
}
