import { Fragment } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

type MapComponentProps = {
  position: [number, number];
  venue: string;
};

const MapComponent = ({ position, venue }: MapComponentProps) => {
  return (
    <Fragment>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={new Icon({ iconUrl: markerIconPng })}>
          <Popup>{venue}</Popup>
        </Marker>
      </MapContainer>
    </Fragment>
  );
};

export default MapComponent;
