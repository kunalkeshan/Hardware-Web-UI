/**
 * Upload Input Component
 */

import React, { FC, useMemo } from 'react';
import axios from '../../../utils/axios';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toast } from 'react-hot-toast';
import {
	setImage,
	setLoading,
	setImageUploadData,
	setUploadSuccessful,
	setDisplayText,
} from '../../../store/features/app';

interface UploadInputProps {
	error: boolean;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SetImagePayload {
	imageName: string;
	imageFile: any;
}

interface FormDataResponse extends SingleImageUploadResponse {}

const UploadInput: FC<UploadInputProps> = ({ error, setError }) => {
	const [imageModality] = useAppSelector((state) => [
		state.app.imageModality,
	]);
	const dispatch = useAppDispatch();

	const disableUploadBtn = useMemo(() => {
		return imageModality.value === '';
	}, [imageModality]);

	console.log(disableUploadBtn);

	const handleImageUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			if (!e.target.files![0]) {
				setError(true);
				return;
			}
			setError(false);
			dispatch(setLoading(true));
			const formData = new FormData();
			formData.append('image', e.target.files![0]);
			const response = await axios.post<FormDataResponse>(
				'/api/upload/image',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			dispatch(setImageUploadData(response.data));
			handleImageChange(e);
			dispatch(setUploadSuccessful(true));
			dispatch(
				setDisplayText({ dataContainer: 'Process image to get data.' })
			);
			return true;
		} catch (error) {
			setError(true);
			return Promise.reject(false);
		} finally {
			dispatch(setLoading(false));
			setTimeout(() => dispatch(setUploadSuccessful(false)), 1800);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const payload: SetImagePayload = {
			imageName: '',
			imageFile: null,
		};
		if (!e.target.files![0]) {
			dispatch(setImage(payload));
			return;
		}
		payload.imageFile = URL.createObjectURL(e.target.files![0]);
		payload.imageName = e.target.files![0].name;
		dispatch(setImage(payload));
	};

	return (
		<div
			className='imageKit__upload hidden__print'
			onClick={() => {
				if (imageModality.value === '') {
					toast.error('Select modality before uploading image!');
					return;
				}
			}}
		>
			<label id='uploadImageBtn'>
				<input
					disabled={disableUploadBtn}
					type='file'
					accept='image/*'
					onChange={(e) => {
						const uploadStatus = handleImageUpload(e);
						toast.promise(uploadStatus, {
							loading: 'Uploading Image...',
							success: 'Image Uploaded Successfully',
							error: 'Unable to upload Image',
						});
					}}
				/>
				Upload Image
			</label>
		</div>
	);
};

export default UploadInput;
