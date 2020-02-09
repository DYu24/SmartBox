import React, { useEffect, useState } from 'react';
import {
    Alert,
    Linking,
    Dimensions,
    LayoutAnimation,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default ScannerScreen = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);

    useEffect(() => {
        const requestCameraPermission = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasCameraPermission(status == 'granted');
        };

        requestCameraPermission();
    });

    handleBarCodeRead = (result) => {
        console.info(result);
    };

    return (
        <View style={styles.container}>
            {hasCameraPermission === null ? (
                <Text>Requesting for camera permission</Text>
            ) : hasCameraPermission === false ? (
                <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                </Text>
            ) : (
                <BarCodeScanner
                    onBarCodeRead={handleBarCodeRead}
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                    }}
                />
            )}
            <StatusBar hidden />
        </View>
    );
};
