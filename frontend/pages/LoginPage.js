import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('+1');
    const loginBtnDisabled = phoneNumber.length <= 2;
    const loginBtnColor = loginBtnDisabled ? '#416d96' : '#004A8E';

    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Smart Box Delivery</Text>
            <View style={{ marginTop: 350 }}>
                <View style={{ borderWidth: 1, borderColor: '#004A8E', borderRadius: 5 }}>
                    <TextInput
                        multiline
                        scrollEnabled={false}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={(number) => setPhoneNumber(number)}
                        style={styles.textInput}/>
                </View>
                <TouchableOpacity style={{...styles.button, backgroundColor: loginBtnColor }} disabled={loginBtnDisabled}>
                    <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
    
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffaed',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50
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
    }
})

export default LoginPage;
    