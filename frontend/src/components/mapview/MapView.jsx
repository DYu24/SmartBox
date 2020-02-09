import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const GOOGLE_MAPS_KEY = 'AIzaSyBKnrEsDPbaXGPNkkJDc6U5aW_0GKv7o3E';

const MapView = () => {
    const [center, setCenter] = useState({ lat: -75.681889, long: 45.421975 }); 
    const [zoom, setZoom] = useState(10);

    const handleApiLoaded = (map, maps) => {
        console.log(map);
        console.log(maps);
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                style={{ height: '100%', width: '100%' }}
                bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
        </div>
    )
}

export default MapView;
