import L from "leaflet";

import dropIcon from "../../app/icons/dropIcon.png";

export const dragIcon = L.icon({
  iconUrl: dropIcon.src,
  iconSize: [70, 70],
  iconAnchor: [35, 20],
});
