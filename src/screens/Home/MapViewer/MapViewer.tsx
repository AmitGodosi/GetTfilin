import { ApplicationState } from "@/services/store/models";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinate } from "@/services/store/components/location";
import MapView, { MapViewProps, Marker } from "react-native-maps";

const MapViewer = ({ }: MapViewProps) => {
	const { coordinate } = useSelector((state: ApplicationState) => state?.locationStore)
	const dispatch = useDispatch()

	const region = {
		latitude: coordinate?.lat,
		latitudeDelta: 0.0922,
		longitude: coordinate?.lng,
		longitudeDelta: 0.0421,
	}

	const selectMapLocationHandler = (event: any) => {
		const { latitude: lat, longitude: lng } = event?.nativeEvent?.coordinate || {}
		dispatch(setCoordinate({ lat, lng }))
	}

	return (
		<MapView style={{ flex: 1 }} initialRegion={region} onPress={selectMapLocationHandler}>
			{!!coordinate?.lat && !!coordinate?.lng && (
				<Marker title='Picked Location' coordinate={{ latitude: coordinate.lat, longitude: coordinate.lng }} />
			)}
		</MapView>
	)
}

export default MapViewer