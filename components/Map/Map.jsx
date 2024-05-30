"use client";

// START: Preserve spaces to avoid auto-sorting
import { useState, useRef, useMemo, useEffect, useContext } from "react";

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import {
  dragIcon,
  ping0Icon,
  ping1Icon,
  ping2Icon,
  ping3Icon,
  ping4Icon,
  ping5Icon,
  flyImg,
} from "./MapIcons";
import DataContext from "@/app/context/DataContext";
// END: Preserve spaces to avoid auto-sorting
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";

export default function Map() {
  const centerPosition = { lat: 33.6461, lng: -117.8427 };
  // const [isEdit, setIsEdit] = useState(true);
  const [position, setPosition] = useState(centerPosition);
  const [events, setEvents] = useState([]);
  const {
    pos,
    setPos,
    isEdit,
    setIsEdit,
    eventId,
    focusLocation,
    setFocusLocation,
  } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
      const data = await response.json();
      const flattenedEvents = data.events.flat();
      setEvents(flattenedEvents);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleFocus = async () => {
      setFocusLocation(null);
    };
    // console.log("location");
    // console.log(focusLocation);

    if (focusLocation) {
      handleFocus();
    }
  }, [focusLocation, setFocusLocation]);

  function generatePingIcon(date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayDiff === 0) {
      return ping0Icon;
    } else if (dayDiff === 1) {
      return ping1Icon;
    } else if (dayDiff === 2) {
      return ping2Icon;
    } else if (dayDiff === 3) {
      return ping3Icon;
    } else if (dayDiff === 4) {
      return ping4Icon;
    } else if (dayDiff === 5) {
      return ping5Icon;
    } else {
      return ping5Icon; // or any default icon for days further away
    }
  }

  const allMarkers = events.map((event) => {
    return (
      <Marker
        key={event.id}
        position={[event.lat, event.long]}
        // eventHandlers={{
        //   click: () => {
        //     onOpen();
        //     setItemData(item);
        //     setFocusLocation(item.location);
        //   },
        // }}
        icon={generatePingIcon(event.date)}
      ></Marker>
    );
  });

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setPos(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  // console.log("posi:", position);
  async function handleSubmit() {
    const pin = {
      event_id: eventId,
      lat: position.lat,
      long: position.lng,
    };
    try {
      console.log("Updating Event Location");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/updateEventLocation/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pin),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.log(error);
      return;
    }
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/events`);
      const data = await response.json();
      const flattenedEvents = data.events.flat();
      setEvents(flattenedEvents);
    };
    fetchData();
    // console.log("ping:", data);
  }

  // console.log("pos:", pos);

  const toggleDraggable = () => {
    handleSubmit();
    setIsEdit(!isEdit);
  };

  function MapFocusLocation({ location }) {
    const map = useMap();

    if (location) {
      if (location.lat === "" || location.lng === "") {
        alert("Event doesn't have coordinates");
        setIsEdit(!isEdit);
        return <></>;
      }
      map.flyTo(
        {
          lat: parseFloat(location.lat) - 0.0008,
          lng: parseFloat(location.lng) + 0.008,
        },
        18
      );
    }

    return location ? (
      <Marker position={location} icon={flyImg}></Marker> // ? there is no fly image??
    ) : null;
  }

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
      center={[33.64513592505738, -117.82476533065436]}
      zoom={17}
      minZoom={15}
      zoomControl={false}
      style={{ height: "1050px", width: "5000px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/ghosnm/ckzq73c69001414nve9hlcx9d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2hvc25tIiwiYSI6ImNrenE2eTZqcjM1N2oyb3FyeXBkaGwzMHoifQ.Y1Fk71N1-mAY4AAmXHAt6Q"
        // Light Mode: "https://api.mapbox.com/styles/v1/ghosnm/cl2jlyr3t002b14kvqib2s4ax/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2hvc25tIiwiYSI6ImNrenE2eTZqcjM1N2oyb3FyeXBkaGwzMHoifQ.Y1Fk71N1-mAY4AAmXHAt6Q"
        // Dark Mode:  "https://api.mapbox.com/styles/v1/ghosnm/ckzq73c69001414nve9hlcx9d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2hvc25tIiwiYSI6ImNrenE2eTZqcjM1N2oyb3FyeXBkaGwzMHoifQ.Y1Fk71N1-mAY4AAmXHAt6Q"
      />
      {allMarkers}
      {!isEdit && <MapFocusLocation location={focusLocation} />}
      {isEdit ? <NewItemMarker /> : null}
    </MapContainer>
  );
}
