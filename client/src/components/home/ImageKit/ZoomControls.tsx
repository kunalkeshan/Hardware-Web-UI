/**
 * Zoom Control Component
 */

// Dependencies
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
	setImageDimensions,
	resetImageDimensions,
} from '../../../store/features/app';

const MAXIMUM_ZOOM_IN = 4;
const MAXIMUM_ZOOM_OUT = 1;

const ZoomControls = () => {
	const [imageDimensions] = useAppSelector((state) => [
		state.app.imageDimensions,
	]);
	const dispatch = useAppDispatch();

	const handleImageZoomIn = () => {
		if (imageDimensions.scale !== MAXIMUM_ZOOM_IN) {
			const updatedDimensions = {
				scale: imageDimensions.scale + 0.5,
			};
			dispatch(setImageDimensions(updatedDimensions));
		}
	};

	const handleImageZoomOut = () => {
		if (imageDimensions.scale !== MAXIMUM_ZOOM_OUT) {
			const updatedDimensions = {
				scale: imageDimensions.scale - 0.5,
			};
			dispatch(setImageDimensions(updatedDimensions));
		}
	};

	const handleResetImage = () => {
		dispatch(resetImageDimensions());
	};

	return (
		<div className='zoomControl__container hidden__print'>
			<button onClick={handleImageZoomIn}>Zoom In</button>
			<button onClick={handleImageZoomOut}>Zoom Out</button>
			<button onClick={handleResetImage}>Reset</button>
		</div>
	);
};

export default ZoomControls;
