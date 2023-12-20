import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { LocationState } from "@/services/store/models";
import { locationStore } from "../consts";
import { EMPTY_STRING } from "@/consts";

type LocationAction = {
	address: string;
	lat: number;
	lng: number;
}

type CoordinateAction = {
	lat: number;
	lng: number;
}

const initialState = {
	address: EMPTY_STRING,
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
		},
		setCoordinate: (state: LocationState, action: PayloadAction<CoordinateAction>) => {
			const { lat, lng } = action.payload || {}
			state.coordinate = {lat, lng }
			state.address = EMPTY_STRING
		}
	}
})

export const setLocation = locationStoreSlice.actions.setLocation
export const setCoordinate = locationStoreSlice.actions.setCoordinate

export default locationStoreSlice.reducer