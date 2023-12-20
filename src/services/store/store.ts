import { configureStore } from "@reduxjs/toolkit";
import locationReducer from './components/location';

export const store: any = configureStore({
	reducer: {
		locationStore: locationReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
})