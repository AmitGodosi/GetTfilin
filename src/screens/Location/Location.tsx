import { useState } from 'react';
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'
import { getMapPreview } from './utils';
import MapViewer from './components/MapViewer';
import CustomPressable from '../../common/Pressable';

const Location = () => {
	const [pickedLocation, setPickedLocation] = useState<{ lat: number, lng: number }>();
	const [markerLocation, setMarkerLocation] = useState<{ lat: number, lng: number }>();
	const [isMap, setIsMap] = useState(false)
	const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

	const verifyPermissions = async () => {
		if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient Permissions!',
				'You need to grant location permissions to use this app.'
			);
			return false;
		}

		return true;
	}

	const getCurrentLocation = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
		setMarkerLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	const selectMapLocationHandler = (event: any) => {
		const { latitude: lat, longitude: lng } = event?.nativeEvent?.coordinate || {}
		setMarkerLocation({ lat, lng })
	}

	return (
		<View style={styles.container}>
			<Text style={{ flex: 1 }}>כתובת: {pickedLocation?.lat} {pickedLocation?.lng}</Text>
			<View style={{ width: '100%', height: '25%', flex: 3 }}>
				{pickedLocation ? (
					<Image
						style={styles.image}
						source={{
							uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
						}}
					/>
				) : (
					<Text style={{ textAlign: 'center' }}>No location picked yet.</Text>
				)}
			</View>
			<View style={styles.actions}>
				<CustomPressable onPressHandler={() => setIsMap(true)} pressableStyle={styles.pressable} text='מפה' textStyle={styles.pressableText} />
				<CustomPressable onPressHandler={getCurrentLocation} pressableStyle={styles.pressable} text='מיקום נוכחי' textStyle={styles.pressableText} />
			</View>
			<View style={{ flex: 3, width: '100%' }}>
				{isMap && pickedLocation && markerLocation && (
					<MapViewer pickedLocation={pickedLocation} markerLocation={markerLocation} onPress={selectMapLocationHandler}></MapViewer>
				)}
			</View>
		</View>
	)
}

export default Location


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
	},
	pressable: {
		marginHorizontal: 10,
		backgroundColor: '#72a4ac',
		padding: 10,
		borderRadius: 5,
	},
	pressableText: {
		color: '#f9f4f4'
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 5
	},
});