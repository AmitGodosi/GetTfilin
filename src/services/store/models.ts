export interface ApplicationState {
	locationStore: LocationState;
};

export interface LocationState {
	coordinate: {
		lat: number;
		lng: number;
	}
	address: string;
};