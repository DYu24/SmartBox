import React, { useEffect, useState } from 'react';
import './App.css';

import Login from './components/login/Login';

import CustomerView from './views/CustomerView';
import CourierView from './views/CourierView';

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
                : isCustomer ? <CustomerView /> : <CourierView />
            }
        </div>
    );
}

export default App;
