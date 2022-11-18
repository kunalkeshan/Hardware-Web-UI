/**
 * Not Found Page
 */

// Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import './NotFound.scss';

import NotFoundAnimationData from '../../assets/lottie/page-not-found.json';

const NotFound = () => {
	const navigate = useNavigate();

	const handleNavigateBack = () => {
		navigate('/');
	};

	return (
		<div className='notFound__container'>
			<Lottie
				play
				loop
				animationData={NotFoundAnimationData}
				className='notFound__animation'
			/>
			<button onClick={handleNavigateBack} className='notFound__button'>Go Back</button>
		</div>
	);
};

export default NotFound;
