/**
 * Data Control Components
 */

// Dependencies
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toast } from 'react-hot-toast';
import { setModality, reset } from '../../../store/features/app';
import './DataControl.scss';

import GetAnimationData from './GetAnimationData';

const DataControl = () => {
	const [imageModality, parsedData, imageFile, displayText] = useAppSelector(
		(state) => [
			state.app.imageModality,
			state.app.parsedData,
			state.app.imageFile,
			state.app.displayText,
		]
	);
	const dispatch = useAppDispatch();

	const disablePrint: boolean = useMemo(() => {
		return parsedData === null || imageFile === null;
	}, [imageFile, parsedData]);

	const disableModality: boolean = useMemo(() => {
		return imageFile !== null;
	}, [imageFile]);

	const modalityOptions = [
		{
			value: '',
			label: 'Modality',
		},
		{
			value: 'mammogram',
			label: 'Mammogram',
		},
		{
			value: 'ultrasound-and-mri',
			label: 'Ultrasound & MRI',
		},
	];

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const payload = {
			value: e.target.value,
			label: modalityOptions.find((ele) => ele.value === e.target.value)!
				.label,
		};
		dispatch(setModality(payload));
	};

	const handleResetState = () => {
		toast.loading('Resetting image and data...', { duration: 1000 });
		setTimeout(() => {
			dispatch(reset());
		}, 1200);
	};

	const handlePrintData = () => {
		window.print();
	};

	return (
		<div className={`home__child dataControl__container`}>
			<div className={`dataControl__data`}>
				{parsedData ? (
					<div className='dataControl__parsedData'>
						<div className='title'>
							<h4>{parsedData.birad.name}</h4> •{' '}
							<p>{parsedData.class_name}</p>
						</div>
						<hr />
						<div className='comments'>
							<p>Comments:</p>
							<ul>
								{parsedData.birad.comments.length > 0 &&
									parsedData.birad.comments.map(
										(comment, index) => (
											<li key={index}>{comment}</li>
										)
									)}
							</ul>
						</div>
						<p className='accuracy'>
							Accuracy: {parsedData.accuracy}
						</p>
					</div>
				) : (
					<GetAnimationData text={displayText.dataContainer!} />
				)}
			</div>
			<div className='dataControl__actions hidden__print'>
				{!parsedData && (
					<select
						name='modality'
						value={imageModality.value}
						id='selectModality'
						onChange={handleSelectChange}
						disabled={disableModality}
					>
						{modalityOptions.map((modality, index) => (
							<option value={modality.value} key={index}>
								{modality.label}
							</option>
						))}
					</select>
				)}
				{parsedData && (
					<button id='resetBtn' onClick={handleResetState}>
						Reset
					</button>
				)}
				<button
					id='printDataBtn'
					disabled={disablePrint}
					onClick={handlePrintData}
				>
					Print Data
				</button>
			</div>
		</div>
	);
};

export default DataControl;
