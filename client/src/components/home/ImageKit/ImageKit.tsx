/**
 * Image kit Component
 */

// Dependencies
import React, { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import axios from '../../../utils/axios';
import { setParsedData, setDisplayText } from '../../../store/features/app';
import './ImageKit.scss';

import UploadImage from './UploadImage';
import UploadingImage from './UploadingImage';
import UploadImageSuccessful from './UploadImageSuccessful';
import UploadError from './UploadImageError';

import ZoomControls from './ZoomControls';
import UploadInput from './UploadInput';
import ImageContainer from './ImageContainer';

import ProcessImagePng from '../../../assets/icons/execute.png';

interface ProcessImageResponse extends ModelPredictionData {}

const ImageKit = () => {
	const [error, setError] = useState<boolean>(false);
	const [
		imageFile,
		imageName,
		imageModality,
		loading,
		uploadSuccessful,
		processing,
		postImageUploadData,
	] = useAppSelector((state) => [
		state.app.imageFile,
		state.app.imageName,
		state.app.imageModality,
		state.app.loading,
		state.app.uploadSuccessful,
		state.app.processing,
		state.app.postImageUploadData,
	]);
	const dispatch = useAppDispatch();

	const disableRunBtn: boolean = useMemo(() => {
		return imageFile === null || imageModality.value.length === 0;
	}, [imageFile, imageModality]);

	const handleProcessImage = async () => {
		try {
			const response = await axios.post<ProcessImageResponse>(
				'/api/process/image',
				postImageUploadData,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			dispatch(setParsedData(response.data));
			return true;
		} catch (error) {
			dispatch(
				setDisplayText({
					dataContainer: 'Unable to process image, try again!',
				})
			);
			return Promise.resolve(false);
		} finally {
		}
	};

	return (
		<div className='home__child imageKit__container'>
			<div className='imageKit__controls'>
				<div className='imageKit__controls--top'>
					<p>
						{imageName} : {imageModality.label}
					</p>
					<button
						id='runModelBtn'
						className={`hidden__print ${
							processing ? 'load-rotate' : ''
						}`}
						title='Run model'
						disabled={disableRunBtn}
						onClick={() => {
							const response = handleProcessImage();
							toast.promise(response, {
								loading: 'Processing image',
								success: 'Image processed successfully',
								error: 'Unable to process Image, try again',
							});
						}}
					>
						<img src={ProcessImagePng} alt='Execute' />
					</button>
				</div>
				{imageFile !== null && <ZoomControls />}
			</div>
			<div className='imageKit__image'>
				{imageFile === null ? (
					loading ? (
						<UploadingImage />
					) : !error ? (
						<UploadImage />
					) : (
						<UploadError />
					)
				) : uploadSuccessful ? (
					<UploadImageSuccessful />
				) : (
					<ImageContainer />
				)}
			</div>
			<UploadInput error={error} setError={setError} />
		</div>
	);
};

export default ImageKit;
