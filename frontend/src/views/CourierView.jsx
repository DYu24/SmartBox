import React, { useState } from 'react';
import {
    Container,
    Menu
} from 'semantic-ui-react';

import QRScanner from '../components/qrScanner/QRScanner';
import MapView from '../components/mapview/MapView';

const CourierView = () => {
    const [activeItem, setActiveItem] = useState('map');

    const handleClick = (e, { name }) => {
        setActiveItem(name);
    }

    const logout = (e) => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item
                        name='map'
                        active={activeItem === 'map'}
                        onClick={handleClick}>Map</Menu.Item>
                    <Menu.Item
                        name='box'
                        active={activeItem === 'box'}
                        onClick={handleClick}>Scan PO Box</Menu.Item>
                    <Menu.Item
                        name='orders'
                        active={activeItem === 'orders'}
                        onClick={handleClick}>Scan Packages</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' onClick={logout} />
                    </Menu.Menu>
                </Container>
            </Menu>
            <div style={{ height: '100vh', width: '100vw'}}>
                {activeItem === 'map' && <MapView />}
                {activeItem === 'box' && <QRScanner />}
                {activeItem === 'orders' && <QRScanner orders />}
            </div>
        </div>
    )
}

export default CourierView;
