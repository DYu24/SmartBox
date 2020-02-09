import React, { useState } from 'react';
import {
    Button,
    Form,
    Grid,
    Header, 
    Segment,
} from 'semantic-ui-react'
import { login } from '../../api';

export const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('+1');
    const loginBtnDisabled = phoneNumber.length <= 2;
    const loginBtnColor = loginBtnDisabled ? '#416d96' : '#004A8E';

    const login = async (event) => {
        try {
            const user = await login(phoneNumber.replace('+1', ''));
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid textAlign='center' style= {{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ width: '50vw' }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-In With Your Phone Number
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input></Form.Input>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}
