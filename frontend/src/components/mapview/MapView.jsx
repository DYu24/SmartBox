import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const GOOGLE_MAPS_KEY = 'AIzaSyBKnrEsDPbaXGPNkkJDc6U5aW_0GKv7o3E';

const MapView = () => {
    const [center, setCenter] = useState({ lat: -75.681889, long: 45.421975 }); 
    const [zoom, setZoom] = useState(10);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
            </GoogleMapReact>
        </div>
    )
}

export default MapView;
