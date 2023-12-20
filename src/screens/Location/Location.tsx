import { useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'
import { convertLocationToAddress, getMapPreview } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/services/store/components/location';
import { ApplicationState } from '@/services/store/models';
import { LocationProps } from './models';
import CustomPressable from '@/common/CustomPressable';
import { BACKGROUND_COLORS } from '@/services/sass/colors';

const Location = ({ navigation }: LocationProps) => {
	const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
	const { coordinate, address } = useSelector((state: ApplicationState) => state?.locationStore)
	const dispatch = useDispatch()

	useEffect(() => {
		getCurrentLocation()
	}, [])

	const getCurrentLocation = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const location = await getCurrentPositionAsync();
		const { latitude: lat, longitude: lng } = location?.coords || {}
		const address = await convertLocationToAddress(lat, lng)
		dispatch(setLocation({ address, lat, lng }))
	}

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

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{coordinate?.lat && coordinate?.lng ? (
					<Image
						style={styles.image}
						source={{
							uri: getMapPreview(coordinate?.lat, coordinate?.lng)
						}}
					/>
				) : (
					<Text style={{ textAlign: 'center', flex: 1 }}>No location picked yet.</Text>
				)}
				<Text style={{fontSize: 24, color: '#fff'}}>{address}</Text>
			</View>
			<View style={{ flex: 4, gap: 20 }}>
				<CustomPressable onPressHandler={() => { }} pressableStyle={styles.pressable} text='שלח מיקום' textStyle={styles.pressableText} />
			</View>
		</View>
	)
}

export default Location


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		gap: 50,
		backgroundColor: BACKGROUND_COLORS.default
	},
	imageContainer: {
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '90%',
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 10,
		overflow: 'hidden'
	},
	pressable: {
		marginHorizontal: 10,
		backgroundColor: '#72a4ac',
		padding: 10,
		borderRadius: 5,
	},
	pressableText: {
		color: '#f9f4f4'
	}
});