import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import StackNavigator from './src/services/navigation/StackNavigator';
import { store } from '@/services/store/store';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		</Provider>
	);
}
