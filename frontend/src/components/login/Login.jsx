import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { login } from '../../api';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const onTextChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const onSubmit = async (event) => {
        try {
            const user = await login(phoneNumber);
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        } finally {
            window.location.reload();
        }
    };

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'
        >
            <Grid.Column style={{ width: '80vw' }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Smart-Box Delivery
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='phone'
                            iconPosition='left'
                            type='tel'
                            placeholder='Phone Number'
                            onChange={onTextChange}
                        />
                        <Button
                            disabled={phoneNumber.length <= 2}
                            color='teal'
                            fluid
                            size='large'
                            onClick={onSubmit}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default Login;
