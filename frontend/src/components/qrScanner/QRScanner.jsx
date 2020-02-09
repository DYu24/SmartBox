import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { Button } from 'semantic-ui-react';
import { addTrip, lockBox, unlockBox } from '../../api';

const QRScanner = (isCustomer, items) => {
    const [result, setResult] = useState();
    const [tripItems, setTripItems] = useState([]);

    const handleError = (error) => {
        console.log(error);
    };

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    const lockPOBox = async () => {
        try {
            await lockBox(result);
        } catch (error) {
            console.log('Unable to lock PO box.');
        }
    };

    const unlockPOBox = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            try {
                await unlockBox(user.phoneNumber, result);
            } catch (error) {
                console.log('Unable to unlock PO box.');
            }
        } else {
            console.log('User is unauthenticated.');
        }
    };

    const addItemToTrip = (itemId) => {
        setTripItems([...tripItems, itemId]);
    };

    const startDelivery = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user != null && !user.customer) {
            try {
                await addTrip(user.id, tripItems)
                setTripItems([]);
            } catch (error) {
                console.log('Unable to start delivery.');
            }
        } else {
            console.log('User is unauthenticated or does not have the permissions.');
        }
    }

    const renderButton = () => {
        if (isCustomer) {
            return (
                <Button color='teal' fluid size='big' onClick={unlockPOBox}>
                    Unlock
                </Button>
            );
        } else {
            if (items) {
                return (
                    <>
                        <Button
                            color='teal'
                            fluid
                            size='big'
                            onClick={addItemToTrip}
                        >
                            Scan Item
                        </Button>
                        {tripItems.length && (
                            <Button
                                color='instagram'
                                fluid
                                size='big'
                                onClick={startDelivery}
                            >
                                Start Delivery
                            </Button>
                        )}
                    </>
                );
            }
            return (
                <Button color='teal' fluid size='large' onClick={lockPOBox}>
                    Lock
                </Button>
            );
        }
    };

    return (
        <div style={{ height: '100vh', width: '100%', backgroundColor: 'white' }}>
            <QrReader
                className='qr-scanner'
                facingMode='environment'
                resolution={1000}
                onError={handleError}
                onScan={handleScan}
                style={{
                    marginTop: '20vh',
                    marginBottom: '2em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            />
            {result && renderButton()}
        </div>
    );
};

export default QRScanner;
