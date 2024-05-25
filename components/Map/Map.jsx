"use client";

// START: Preserve spaces to avoid auto-sorting
import {
  useState,
  useRef,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { dragIcon } from "./MapIcons";

// END: Preserve spaces to avoid auto-sorting
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

export default function Map() {
  const centerPosition = { lat: 33.6461, lng: -117.8427 };
  const [isEdit, setIsEdit] = useState(true);
  const [position, setPosition] = useState(centerPosition);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  async function handleSubmit() {
    console.log("Submitted");
  }

  const toggleDraggable = () => {
    handleSubmit();
    setIsEdit(!isEdit);
  };

  const NewItemMarker = () => {
    useMapEvents({
      click(event) {
        setPosition(event.latlng);
      },
    });

    return position.lat !== centerPosition[0] &&
      position.lng !== centerPosition[1] ? (
      <Marker
        className="marker"
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={dragIcon}
      >
        <Popup minWidth={90} closeButton={false}>
          <span className="popup" onClick={() => toggleDraggable()}>
            Confirm? ✅
          </span>
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      preferCanvas={true}
      center={[33.6461, -117.8427]}
      zoom={17}
      minZoom={15}
      scrollWheelZoom={true}
      style={{ height: "1250px", width: "5000px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/ghosnm/ckzq73c69001414nve9hlcx9d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2hvc25tIiwiYSI6ImNrenE2eTZqcjM1N2oyb3FyeXBkaGwzMHoifQ.Y1Fk71N1-mAY4AAmXHAt6Q"
        // Light Mode: "https://api.mapbox.com/styles/v1/ghosnm/cl2jlyr3t002b14kvqib2s4ax/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2hvc25tIiwiYSI6ImNrenE2eTZqcjM1N2oyb3FyeXBkaGwzMHoifQ.Y1Fk71N1-mAY4AAmXHAt6Q"
        // Dark Mode:  "https://api.mapbox.com/styles/v1/ghosnm/ckzq73c69001414nve9hlcx9d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2hvc25tIiwiYSI6ImNrenE2eTZqcjM1N2oyb3FyeXBkaGwzMHoifQ.Y1Fk71N1-mAY4AAmXHAt6Q"
      />

      <NewItemMarker />
    </MapContainer>
  );
}
