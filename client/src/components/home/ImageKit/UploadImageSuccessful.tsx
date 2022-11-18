/**
 * Upload Image Successful Component
 */

// Dependencies
import React from 'react';
import Lottie from 'react-lottie-player';

import UploadImageSuccessfulAnimationData from '../../../assets/lottie/upload-successful.json';

const UploadImageSuccessful = () => {
	return (
		<div className='imageKit__animationContainer'>
			<Lottie
				play
				speed={2}
				animationData={UploadImageSuccessfulAnimationData}
				className='imageKit__animation'
			/>
			<p>Image uploaded successfully.</p>
		</div>
	);
};

export default UploadImageSuccessful;
