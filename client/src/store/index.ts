/**
 * Application Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/app';

const store = configureStore({
	reducer: {
		app: appReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
