import { ApplicationState } from "@/services/store/models";
import { useState } from "react";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

const MapViewer = () => {
	const { coordinate } = useSelector((state: ApplicationState) => state?.locationStore)
	const [markerCoordinate, setMarkerCoordinate] = useState<{ lat: number, lng: number }>({ lat: coordinate.lat, lng: coordinate.lng });

	const region = {
		latitude: coordinate?.lat,
		latitudeDelta: 0.0922,
		longitude: coordinate?.lng,
		longitudeDelta: 0.0421,
	}

	const selectMapLocationHandler = (event: any) => {
		const { latitude: lat, longitude: lng } = event?.nativeEvent?.coordinate || {}
		setMarkerCoordinate({ lat, lng })
	}

	return (
		<MapView style={{ flex: 1 }} initialRegion={region} onPress={selectMapLocationHandler}>
			{!!markerCoordinate?.lat && !!markerCoordinate?.lng && (
				<Marker title='Picked Location' coordinate={{ latitude: markerCoordinate.lat, longitude: markerCoordinate.lng }} />
			)}
		</MapView>
	)
}

export default MapViewer