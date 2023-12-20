import { RootStackParamList, RoutesNames, ScreensNames } from './models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import Location from '../../screens/Location/Location';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
	return (
		<>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<Stack.Navigator>
					<Stack.Screen name={RoutesNames.HOME_ROUTE} component={Home} options={{ title: ScreensNames.HOME }} />
					<Stack.Screen name={RoutesNames.LOCATION_ROUTE} component={Location} options={{ title: ScreensNames.LOCATION }} />
				</Stack.Navigator>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d2dee0'
	},
});
