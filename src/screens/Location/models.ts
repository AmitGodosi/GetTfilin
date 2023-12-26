import { RootStackParamList } from "@/services/navigation/models";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type LocationProps = NativeStackScreenProps<RootStackParamList, 'Location'>;

export type FormModalProps = {
	isModalOpen: boolean;
	onClose: () => void;
}