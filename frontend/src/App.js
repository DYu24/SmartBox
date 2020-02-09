import React, { useEffect, useState } from 'react';
import './App.css';

import Login from './components/login/Login';
import MapView from './components/mapview/MapView';

function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user != null) {
            setSignedIn(true);
            setIsCustomer(JSON.parse(user).customer);
        }
    }, []);
    
    return (
        <div className="App">
            {!signedIn 
                ? <Login />
                : isCustomer ? <h1>Hello customer!</h1> : <MapView />
            }
        </div>
    );
}

export default App;
