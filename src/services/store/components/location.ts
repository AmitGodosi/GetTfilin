import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { LocationState } from "@/services/store/models";
import { locationStore } from "../consts";

type LocationAction = {
	address: string;
	lat: number;
	lng: number;
}

const initialState = {
	address: '',
	coordinate: {}
} as LocationState

const locationStoreSlice = createSlice({
	name: locationStore,
	initialState,
	reducers: {
		setLocation: (state: LocationState, action: PayloadAction<LocationAction>) => {
			const { address, lat, lng } = action.payload || {}
			state.address = address;
			state.coordinate = { lat, lng }
		}
	}
})

export const setLocation = locationStoreSlice.actions.setLocation

export default locationStoreSlice.reducer