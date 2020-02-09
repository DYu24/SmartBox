// import React, { useState } from 'react';
// import GoogleMapReact from 'google-map-react';

// const GOOGLE_MAPS_KEY = 'AIzaSyBKnrEsDPbaXGPNkkJDc6U5aW_0GKv7o3E';

// const MapView = () => {
//     const [center, setCenter] = useState({ lat: -75.681889, long: 45.421975 }); 
//     const [zoom, setZoom] = useState(10);

//     const handleApiLoaded = (map, maps) => {
//         console.log(map);
//         console.log(maps);
//     }

//     return (
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact
//                 style={{ height: '100%', width: '100%' }}
//                 bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
//                 defaultCenter={center}
//                 defaultZoom={zoom}
//                 yesIWantToUseGoogleMapApiInternals
//                 onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//             >
//             </GoogleMapReact>
//         </div>
//     )
// }

// export default MapView;

import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const MapView = () => {
    const [viewPort, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        longitude: -75.681889,
        latitude: 45.421975,
        zoom: 13
    });

    return (
        <div>
            <ReactMapGL {...viewPort} onViewportChange={setViewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
        </div>
    );
}

export default MapView;
