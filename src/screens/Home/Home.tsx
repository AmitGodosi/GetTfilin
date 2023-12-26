import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { RoutesNames } from '@/services/navigation/models'
import { HomeProps } from './models'
import { useLayoutEffect } from 'react'
import { BACKGROUND_COLORS, PRESSABLE_COLORS } from '@/services/sass/colors'
import CustomPressable from '@/common/CustomPressable'

const Home = ({ navigation }: HomeProps) => {

	useLayoutEffect(() => {
		navigation.setOptions({ headerShown: false })
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleSection}>
				<Text style={styles.title}>עדיין לא הנחת תפילין היום?</Text>
				<Text style={styles.subtitle}>הכנס את מיקומך ונגיע עד אליך!</Text>
			</View>
			<View style={styles.actions}>
				<CustomPressable pressableStyle={styles.pressable} text='סטטוס' textStyle={[styles.PressableText, { color: PRESSABLE_COLORS.pink }]} />
				<CustomPressable
					onPressHandler={() => navigation.navigate(RoutesNames.LOCATION_ROUTE)}
					pressableStyle={styles.pressable}
					text='התחל'
					textStyle={[styles.PressableText, { color: PRESSABLE_COLORS.blue }]}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: BACKGROUND_COLORS.default,
	},
	titleSection: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20
	},
	title: {
		fontSize: 24,
		color: PRESSABLE_COLORS.white
	},
	subtitle: {
		fontSize: 24,
		color: PRESSABLE_COLORS.blue
	},
	actions: {
		flex: 3,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		gap: 20
	},
	pressable: {
		backgroundColor: PRESSABLE_COLORS.white,
		padding: 10,
		borderRadius: 5,
		width: '20%'
	},
	PressableText: {
		fontSize: 18,
		textAlign: 'center'
	}
})

export default Home
