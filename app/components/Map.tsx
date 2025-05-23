"use client";

import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import Flag from "react-world-flags";

// @ts-expect-error - suppressing type error due to missing type in external lib

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  center?: number[];
  locationValue?: string;
};

function Map({ center, locationValue }: Props) {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [53, -0.07]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg" >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locationValue ? (
        <>
          {center && (
            <Marker position={center as L.LatLngExpression}>
              <Popup>
                <div className="flex justify-center items-center animate-bounce">
                  <Flag code={locationValue} className="w-10" />
                </div>
              </Popup>
            </Marker>
          )}
        </>
      ) : (
        <>{center && <Marker position={center as L.LatLngExpression} />}</>
      )}
    </MapContainer>
  );
}

export default Map;

// "use client";

// import L from "leaflet";
// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/leaflet.css";
// import Flag from "react-world-flags";

// // Avoid TS error more safely:
// (L.Icon.Default.prototype as any)._getIconUrl && delete (L.Icon.Default.prototype as any)._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// type Props = {
//   center?: [number, number];
//   locationValue?: string;
// };

// function Map({ center, locationValue }: Props) {
//   const position: L.LatLngExpression = center || [53, -0.07];

//   return (
//     <MapContainer
//       center={position}
//       zoom={center ? 4 : 2}
//       scrollWheelZoom={false}
//       className="h-[35vh] rounded-lg"
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={position}>
//         {locationValue && (
//           <Popup>
//             <div className="flex justify-center items-center animate-bounce">
//               <Flag code={locationValue} className="w-10" />
//             </div>
//           </Popup>
//         )}
//       </Marker>
//     </MapContainer>
//   );
// }

// export default Map;
