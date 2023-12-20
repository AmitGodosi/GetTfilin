import { Pressable, StyleSheet, Text, SafeAreaView } from 'react-native'
import { RoutesNames } from '@/services/navigation/models'
import { HomeProps } from './models'
import { useLayoutEffect } from 'react'

const Home = ({ navigation }: HomeProps) => {
	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false })
	}, [])
	
	return (
		<SafeAreaView style={styles.container}>
			<Pressable style={styles.pressable} onPress={() => navigation.navigate(RoutesNames.LOCATION_ROUTE)}>
				<Text style={{ color: '#f9f4f4' }}>אני רוצה להניח!</Text>
			</Pressable>
		</SafeAreaView>
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
