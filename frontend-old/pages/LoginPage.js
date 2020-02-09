import React, { useState } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    View,
} from 'react-native';
import { login } from '../api';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const LoginPage = ({loginCallback}) => {
    const [phoneNumber, setPhoneNumber] = useState('+1');
    const loginBtnDisabled = phoneNumber.length <= 2;
    const loginBtnColor = loginBtnDisabled ? '#416d96' : '#004A8E';

    const login = async (event) => {
        try {
            const user = await login(phoneNumber.replace('+1', ''));
            await AsyncStorage.setItem('user', JSON.stringify(user));
            loginCallback(user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <Text style={styles.logoText}>Smart Box Delivery</Text>
                <View style={{ marginTop: 350 }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#004A8E',
                            borderRadius: 5,
                        }}
                    >
                        <TextInput
                            multiline
                            scrollEnabled={false}
                            keyboardType='phone-pad'
                            value={phoneNumber}
                            onChangeText={(number) => setPhoneNumber(number)}
                            style={styles.textInput}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            ...styles.button,
                            backgroundColor: loginBtnColor,
                        }}
                        disabled={loginBtnDisabled}
                        onPress={login}
                    >
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DismissKeyboard>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffaed',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    button: {
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#004A8E',
        marginTop: 20,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
    },
    logoText: {
        paddingHorizontal: 50,
        position: 'absolute',
        top: 150,
        fontSize: 36,
        color: '#004A8E',
    },
    loginText: {
        fontSize: 16,
        color: 'white',
    },
    textInput: {
        height: 50,
        fontSize: 26,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingLeft: 5,
    },
});

export default LoginPage;
