import { RoutesNames } from "@/services/navigation/models";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "react-native";

export default function LocationHeaderRight() {
	const navigation = useNavigation()

	const onPressHandler = () => {
		navigation.navigate(RoutesNames.MAP_VIEW_ROUTE as never)
	}

	return (
		<Pressable onPress={onPressHandler}>
			<Text>מפה</Text>
		</Pressable>
	)
}