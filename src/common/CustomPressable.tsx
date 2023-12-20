import { Pressable, Text } from "react-native"

type Props = {
	pressableStyle: any;
	text: string;
	textStyle?: any;
	onPressHandler?: () => void;
}
const CustomPressable = ({ onPressHandler, text, pressableStyle, textStyle }: Props) => {
	return (
		<Pressable style={pressableStyle} onPress={onPressHandler}>
			<Text style={textStyle}>{text}</Text>
		</Pressable>
	)
}

export default CustomPressable