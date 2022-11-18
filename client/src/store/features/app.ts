/**
 * Application Slice
 */

// Dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
	imageFile: null | string;
	imageName: string;
	imageModality: {
		value: string;
		label: string;
	};
	imageDimensions: {
		scale: number;
	};
	displayText: {
		dataContainer?: string;
		imageContainer?: string;
	};
	parsedData: null | ModelPredictionData;
	postImageUploadData?: SingleImageUploadResponse;
	loading: boolean;
	processing: boolean;
	uploadSuccessful: boolean;
}

const initialState: AppState = {
	imageFile: null,
	imageName: '',
	imageModality: {
		value: '',
		label: 'Select Modality',
	},
	imageDimensions: {
		scale: 1,
	},
	displayText: {
		dataContainer: 'Upload Image to get data.',
		imageContainer: 'Upload image to get started.',
	},
	parsedData: null,
	loading: false,
	processing: false,
	uploadSuccessful: false,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setImage: (
			state,
			action: PayloadAction<{
				imageFile: string | null;
				imageName: string;
			}>
		) => {
			if (state.imageFile) URL.revokeObjectURL(state.imageFile);
			state.imageFile = action.payload.imageFile;
			state.imageName = action.payload.imageName;
			state.parsedData = null;
		},
		setModality: (
			state,
			action: PayloadAction<{ value: string; label: string }>
		) => {
			state.imageModality = action.payload;
		},
		setImageDimensions: (
			state,
			action: PayloadAction<AppState['imageDimensions']>
		) => {
			state.imageDimensions = {
				...state.imageDimensions,
				...action.payload,
			};
		},
		resetImageDimensions: (state) => {
			state.imageDimensions = initialState.imageDimensions;
		},
		setImageUploadData: (
			state,
			action: PayloadAction<SingleImageUploadResponse>
		) => {
			state.postImageUploadData = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setUploadSuccessful: (state, action: PayloadAction<boolean>) => {
			state.uploadSuccessful = action.payload;
		},
		setParsedData: (state, action: PayloadAction<ModelPredictionData>) => {
			state.parsedData = action.payload;
		},
		setDisplayText: (
			state,
			action: PayloadAction<AppState['displayText']>
		) => {
			const keys = Object.keys(action.payload);
			if (keys && keys.length <= 0) return;
			state.displayText = { ...state.displayText, ...action.payload };
		},
		reset: () => initialState,
	},
});

export const {
	reset,
	setModality,
	setLoading,
	setImage,
	setImageUploadData,
	setUploadSuccessful,
	setDisplayText,
	setParsedData,
	resetImageDimensions,
	setImageDimensions,
} = appSlice.actions;

export default appSlice.reducer;
