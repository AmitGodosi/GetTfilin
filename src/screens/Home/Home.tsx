import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RoutesNames } from '@/services/navigation/models'

const Home = ({ navigation }: any) => {
	return (
		<View style={styles.container}>
			<Pressable style={styles.pressable} onPress={() => navigation.navigate(RoutesNames.LOCATION_ROUTE)}>
				<Text style={{ color: '#f9f4f4' }}>אני רוצה להניח!</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pressable: {
		backgroundColor: '#72a4ac',
		padding: 10,
		borderRadius: 5,
	}
})

export default Home
