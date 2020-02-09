import React, { useState } from 'react';
import {
    Container,
    Menu
} from 'semantic-ui-react';

import QRScanner from '../components/qrScanner/QRScanner';

const CustomerView = () => {
    const [activeItem, setActiveItem] = useState('qr');

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
                        name='qr'
                        active={activeItem === 'qr'}
                        onClick={handleClick}>QR</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' onClick={logout} />
                    </Menu.Menu>
                </Container>
            </Menu>
            <Container>
                {activeItem === 'qr' && <QRScanner isCustomer />}
            </Container>
        </div>
    )
}

export default CustomerView;
