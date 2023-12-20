import { Pressable, Text } from "react-native"

type Props = {
	pressableStyle: any;
	textStyle: any;
	onPressHandler: () => void;
	text: string;
}
const CustomPressable = ({ onPressHandler, text, pressableStyle, textStyle }: Props) => {
	return (
		<Pressable style={pressableStyle} onPress={onPressHandler}>
			<Text style={textStyle}>{text}</Text>
		</Pressable>
	)
}

export default CustomPressable