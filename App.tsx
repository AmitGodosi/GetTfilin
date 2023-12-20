import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/services/navigation/StackNavigator';

export default function App() {
	return (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	);
}
