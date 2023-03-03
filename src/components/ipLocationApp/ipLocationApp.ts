//import { renderHeader } from "../header/header";
import "./ipLocationApp.css";
import { LocationData } from "../../types/location_types";
import { isValidIPv4, isValidIPv6 } from "../../utils/validation";
import { getIpLocationData } from "../../api/api_ipfy";
import { dataPanel } from "../dataPanel/dataPanel";
import * as L from "leaflet";

// 192.212.174.101
const DEFAULT_DATA: LocationData = {
  ip: "192.212.174.101",
  isp: "Southern California Edison",
  location: {
    city: "South San Gabriel",
    country: "US",
    timezone: "UTC-08:00",
    region: "California",
    lat: 34.04915,
    lng: -118.09462,
    geonameId: 5397771,
  },
};

export class IpLocationApp {
  ipMap: L.Map;

  constructor() {
    this.renderHeader(DEFAULT_DATA);
    this.ipMap = this.renderMap(
      DEFAULT_DATA.location.lat,
      DEFAULT_DATA.location.lng
    );
  }

  renderHeader(locationData: LocationData) {
    const header = document.createElement("header");
    header.className = "header";
    header.id = "locationHeader";
    const form = document.createElement("form");
    form.className = "location-form";
    form.innerHTML = ` <input type="text" name="ip" id="ip"/> <button type="submit" id="submit">Find</button>`;
    header.insertAdjacentElement("afterbegin", form);
    header.innerHTML += dataPanel(locationData);

    const mountedForm = header.querySelector(".location-form")!;
    mountedForm.addEventListener("submit", this.getIpLocation.bind(this));

    document
      .getElementById("ipLocationApp")!
      .insertAdjacentElement("afterbegin", header);
  }

  renderMap(lat: number, lng: number) {
    const mapContainer = document.createElement("div");
    mapContainer.id = "map";
    document
      .getElementById("locationHeader")
      ?.insertAdjacentElement("afterend", mapContainer);
    //
    let map = L.map("map", { zoomControl: false });
    map.setView([lat, lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);
    return map;
  }

  getIpLocation(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("#ip") as HTMLInputElement;
    const enteredIp = input.value;
    if (isValidIPv4(enteredIp) || isValidIPv6(enteredIp) || enteredIp === "") {
      console.log("IP - VALID");
      getIpLocationData<LocationData>(enteredIp)
        .then((locationData) => {
          console.log(locationData, this);
          document.querySelector(".data-panel")?.remove();
          this.updateMap(locationData.location.lat, locationData.location.lng);
          document.querySelector(".header")!.innerHTML +=
            dataPanel(locationData);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("IP - INVALID");
    }
  }

  updateMap(lat: number, lng: number) {
    this.ipMap.setView([lat, lng], 13);
    L.marker([lat, lng]).addTo(this.ipMap);
  }
}
