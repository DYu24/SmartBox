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

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import * as pin from '../../assets/pin.png';

const MapView = () => {
    const [boxLocations, setBoxLocations] = useState([]);
    const [viewPort, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        longitude: -75.681889,
        latitude: 45.421975,
        zoom: 13
    });

    useEffect(() => {
        const boxes = JSON.parse(localStorage.getItem('boxes'));
        if (boxes != null) {
            const x = [{id: 1, longitude: -75.677767, latitude: 45.423169}, {id: 2, longitude: -75.680728, latitude: 45.423975}]
            setBoxLocations(x.concat(boxes.map(({longitude, latitude}) => ({longitude, latitude}))));
        }
    }, [])

    const renderBoxLocations = () => {
        return boxLocations.map(({id, longitude, latitude}) => (
            <Marker key={id} latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}>
                <img src={pin} width={30} />
            </Marker>
        ));
    }

    return (
        <div>
            <ReactMapGL {...viewPort} onViewportChange={setViewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
                {/* <Marker latitude={45.421975} longitude={-75.681889}>
                    <img src={pin} width={20} />
                </Marker> */}
                {renderBoxLocations()}
            </ReactMapGL>
        </div>
    );
}

export default MapView;
