import { locationDataItem } from "../locationDataItem/locationDataItem";
import { LocationData } from "../../types/location_types";
import "./dataPanel.css";

export function dataPanel(locationData: LocationData) {
  const { country, region, city, timezone } = locationData.location;
  return `<section class='data-panel'>
  <ul>
    ${locationDataItem("ip address", locationData.ip)}
    ${locationDataItem("location", city, country, region)}
    ${locationDataItem("timezone", timezone)}
    ${locationDataItem("isp", locationData.isp)}
    </ul>
    </section>`;
}
