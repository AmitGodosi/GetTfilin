import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
	pickedLocation: { lat: number, lng: number };
	markerLocation: { lat: number, lng: number }
	onPress: (event: any) => void;
}
const MapViewer = ({ markerLocation, pickedLocation, onPress }: Props) => {
	const { lat: latitude, lng: longitude } = pickedLocation || {}
	const region = {
		latitude,
		latitudeDelta: 0.0922,
		longitude,
		longitudeDelta: 0.0421,
	}

	return (
		//<MapView style={{ flex: 1 }} initialRegion={region} onPress={onPress}>
		//	<Marker title='Picked Location' coordinate={{ latitude: markerLocation?.lat, longitude: markerLocation?.lng }} />
		//</MapView>
		<Text>Need to fix Map View</Text>
	)
}

export default MapViewer