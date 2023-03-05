import { locationDataItem } from "../locationDataItem/locationDataItem";
import { LocationData } from "../../types/location_types";
import "./dataPanel.css";

export function dataPanel(locationData: LocationData) {
  return `<section class='data-panel'>
 ${dataPanelList(locationData)}
    </section>`;
}

export function dataPanelList(locationData: LocationData) {
  const { country, region, city, timezone } = locationData.location;
  return `<ul class='data-panel__list'>
  ${locationDataItem("ip address", locationData.ip)}
  ${locationDataItem("location", city, country, region)}
  ${locationDataItem("timezone", timezone)}
  ${locationDataItem("isp", locationData.isp)}
</ul>`;
}
