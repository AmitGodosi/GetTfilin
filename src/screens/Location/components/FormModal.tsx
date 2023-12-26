import { Text, Modal, StyleSheet, View, TextInput, Alert } from 'react-native'
import { FormModalProps } from '../models'
import { useState } from 'react'
import { EMPTY_STRING } from '@/consts'
import CustomPressable from '@/common/CustomPressable'

const FormModal = ({ onClose, isModalOpen }: FormModalProps) => {
	const [name, setName] = useState(EMPTY_STRING)
	const [phone, setPhone] = useState(EMPTY_STRING)

	const onSubmit = () => {
		if (!name || !phone) {
			Alert.alert('please fill the missing fields')
			return
		}
		console.log(name, phone)
		onClose()
	}

	return (
		<Modal
			animationType='fade'
			transparent
			visible={isModalOpen}
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<View style={styles.form}>
						<View style={styles.field}>
							<TextInput onChangeText={(text) => setName(text)} style={styles.fieldInput} />
							<Text style={styles.filedText}>שם מלא</Text>
						</View>
						<View style={styles.field}>
							<TextInput onChangeText={(text) => setPhone(text)} style={styles.fieldInput} />
							<Text style={styles.filedText}>טלפון</Text>
						</View>
					</View>
					<CustomPressable
						pressableStyle={styles.pressable}
						text='אישור'
						onPressHandler={onSubmit}
						textStyle={styles.pressableText}
					/>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		alignItems: 'center',
		backgroundColor: '#cec8c8',
		flex: 1,
		justifyContent: 'center',
		opacity: 0.95
	},
	modal: {
		borderRadius: 10,
		padding: 20,
		width: '80%',
		backgroundColor: '#a99a9a',
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		gap: 20,
	},
	field: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		flexDirection: 'row',
	},
	filedText: {
		fontSize: 18,
		flex: 1,
		textAlign: 'right',

	},
	fieldInput: {
		backgroundColor: 'white',
		padding: 5,
		borderRadius: 5,
		flex: 3,
		fontSize: 16
	},
	pressable: {
		padding: 10,
		backgroundColor: '#cec8c8',
		marginTop: 20,
		borderRadius: 5
	},
	pressableText: {
		fontSize: 18,

	}

})

export default FormModal