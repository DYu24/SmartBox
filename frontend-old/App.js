import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import LoginPage from './pages/LoginPage';
import CustomerPage from './pages/CustomerPage';

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);

    const loginCallback = (user) => {
        if (user) {
            setAuthenticated(true);

            if (user.address) {
                setIsCustomer(true);
            }
        }
    };

    return (
        <NavigationContainer>
            {/* <CustomerPage /> */}
            <LoginPage loginCallback={loginCallback} />
        </NavigationContainer>
        // <>
        //     {!authenticated ? (
        //         <LoginPage loginCallback={loginCallback} />
        //     ) : isCustomer ? (
        //         <LoginPage loginCallback={loginCallback} />
        //     ) : (
        //         <>IS COURIER</>
        //     )}
        // </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
