import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import { convertLocationToAddress, getMapPreview } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/services/store/components/location';
import { ApplicationState } from '@/services/store/models';
import { LocationProps } from './models';
import { BACKGROUND_COLORS, PRESSABLE_COLORS } from '@/services/sass/colors';
import CustomPressable from '@/common/CustomPressable';
import FormModal from './components/FormModal';

const Location = ({ }: LocationProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { coordinate: { lat, lng }, address } = useSelector((state: ApplicationState) => state?.locationStore)
	const dispatch = useDispatch()

	useEffect(() => {
		getCurrentLocation()
	}, [])

	useEffect(() => {
		if (lat && lng) {
			getAddressFromCoordinate(lat, lng)
		}
	}, [lat, lng])

	const getCurrentLocation = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const location = await getCurrentPositionAsync();
		const { latitude: lat, longitude: lng } = location?.coords || {}
		getAddressFromCoordinate(lat, lng)
	}

	const getAddressFromCoordinate = async (lat: number, lng: number) => {
		const address = await convertLocationToAddress(lat, lng)
		dispatch(setLocation({ address, lat, lng }))
	}

	const verifyPermissions = async () => {
		try {
			const { status } = await requestForegroundPermissionsAsync();
			if (status === PermissionStatus.DENIED) {
				Alert.alert(
					'Insufficient Permissions!',
					'You need to grant location permissions to use this app.'
				);
				return false;
			}
			return true;
		} catch (e) {
			throw new Error('Error requesting location permissions')
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{lat && lng ? (
					<Image
						style={styles.image}
						source={{
							uri: getMapPreview(lat, lng)
						}}
					/>
				) : (
					<Text style={{ textAlign: 'center', flex: 1 }}>No location picked yet.</Text>
				)}
				<Text style={{ fontSize: 24, color: PRESSABLE_COLORS.white, textAlign: 'center' }}>{address}</Text>
			</View>
			<View style={{ flex: 4, gap: 20 }}>
				<CustomPressable
					onPressHandler={() => setIsModalOpen(true)}
					pressableStyle={styles.pressable}
					text='שלח מיקום'
					textStyle={styles.pressableText}
				/>
			</View>
			{isModalOpen && (
				<FormModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			)}
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
		width: '90%'
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
		backgroundColor: PRESSABLE_COLORS.white,
		padding: 10,
		borderRadius: 5,
	},
	pressableText: {
		color: PRESSABLE_COLORS.blue,
		fontSize: 18
	}
});