import "./ipLocationApp.css";
import { LocationData } from "../../types/location_types";
import { validateIp } from "../../utils/validation";
import { getIpLocationData } from "../../api/api_ipfy";
import { dataPanel, dataPanelList } from "../dataPanel/dataPanel";
import * as L from "leaflet";
import MarkerIcon from "../../../src/images/icon-location.svg";
import isValidDomain from "is-valid-domain";

var IconMarker = L.icon({
  iconUrl: MarkerIcon,
  iconSize: [38, 50],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const MARKER_OFFSET = 0.015;

const DEFAULT_DATA: LocationData = {
  ip: "192.212.174.101",
  isp: "Southern California Edison ",
  location: {
    city: "South San Gabriel",
    country: "US",
    timezone: "-08:00",
    region: "California",
    lat: 34.04915,
    lng: -118.09462,
    geonameId: 5397771,
  },
};

export class IpLocationApp {
  ipMap: L.Map | undefined;
  locationData: LocationData | undefined;

  constructor() {
    // getIpLocationData<LocationData>()
    //   .then((locationData) => {
    //     this.configureUI(locationData);
    //     this.ipMap = this.renderMap(
    //       locationData.location.lat,
    //       locationData.location.lng
    //     );
    //   })
    //   .catch((err) => console.log(err));
    this.configureUI(DEFAULT_DATA);
    this.ipMap = this.renderMap(
      DEFAULT_DATA.location.lat,
      DEFAULT_DATA.location.lng
    );
  }

  configureUI(locationData: LocationData) {
    const header = document.createElement("header");
    const heading = document.createElement("h1");
    header.className = "ip-location-header";
    heading.className = "ip-location-header__heading";
    header.id = "locationHeader";

    heading.textContent = "IP Address Tracker";

    const form = document.createElement("form");
    form.className = "location-form";
    form.innerHTML = ` <input type="text" name="ip" id="ip" placeholder="Search for any IP address or domain"/>
     <button type="submit" id="submit">
     <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
     </button>`;
    header.insertAdjacentElement("afterbegin", heading);
    header.appendChild(form);
    header.innerHTML += dataPanel(locationData);

    const mountedForm = header.querySelector(".location-form")!;
    mountedForm.addEventListener(
      "submit",
      this.getIpLocationSubmitHandler.bind(this)
    );

    const appContainer = document.getElementById(
      "ipLocationApp"
    ) as HTMLDivElement;

    appContainer.insertAdjacentElement("afterbegin", header);
  }

  renderMap(lat: number, lng: number) {
    const mapContainer = document.createElement("div");
    mapContainer.id = "map";
    document
      .getElementById("locationHeader")
      ?.insertAdjacentElement("afterend", mapContainer);
    //
    let map = L.map("map", { zoomControl: false });
    map.setView([lat + MARKER_OFFSET, lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([lat, lng], { icon: IconMarker }).addTo(map);
    return map;
  }

  async getIpLocationSubmitHandler(e: Event) {
    e.preventDefault();

    const ipForm = document.querySelector(".location-form") as HTMLFormElement;
    const input = ipForm.querySelector("#ip") as HTMLInputElement;
    const buttonSubmit = ipForm.querySelector("#submit") as HTMLButtonElement;
    let enteredValue = input.value;
    // listener for case of incorrect inputs
    const inputListener = (e: Event) => {
      enteredValue = (e.target as HTMLInputElement).value;
      if (
        validateIp(enteredValue) ||
        isValidDomain(enteredValue) ||
        enteredValue === ""
      ) {
        buttonSubmit.disabled = false;
        buttonSubmit.classList.remove("disabled-button");
        input.style.borderColor = "transparent";
      }
    };

    input.removeEventListener("input", inputListener);
    //

    if (
      validateIp(enteredValue) ||
      isValidDomain(enteredValue) ||
      enteredValue === ""
    ) {
      try {
        this.locationData = await getIpLocationData<LocationData>(enteredValue);
        this.updatePanel();
        this.updateMap();
      } catch (err: any) {
        const dataPanel = document.querySelector(
          ".data-panel"
        ) as HTMLDivElement;
        dataPanel.style.display = "block";
        dataPanel.style.textAlign = "center";
        let message = err;
        if (err instanceof Error) {
          message = err.message;
        }
        dataPanel.innerHTML = `<h3>No data for such IP/domain</h3> <p><i>${message}</i></p>`;
      }
    } else {
      input.style.borderColor = "salmon";
      buttonSubmit.disabled = true;
      buttonSubmit.classList.add("disabled-button");
      input.addEventListener("input", inputListener);
    }
  }

  updateMap() {
    if (this.ipMap && this.locationData) {
      const [lat, lng] = [
        this.locationData.location.lat,
        this.locationData.location.lng,
      ];
      this.ipMap.setView([lat + MARKER_OFFSET, lng], 13);
      L.marker([lat, lng], { icon: IconMarker }).addTo(this.ipMap);
    }
  }

  updatePanel() {
    const dataPanelElement = document.querySelector(
      ".data-panel"
    ) as HTMLDivElement;

    if (this.locationData) {
      const newDataPanelList = dataPanelList(this.locationData);
      dataPanelElement.innerHTML = newDataPanelList;
    }
  }
}
