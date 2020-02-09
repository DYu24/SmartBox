import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ScannerScreen from '../screens/ScannerScreen';

const Tab = createBottomTabNavigator()

export default class CustomerPage {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name='Scanner' component={ScannerScreen} />
            </Tab.Navigator>
        );
    }
}