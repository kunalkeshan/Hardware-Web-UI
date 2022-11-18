/**
 * Upload Image Component
 */

// Dependencies
import React from 'react';
import Lottie from 'react-lottie-player';

import UploadImageAnimationData from '../../../assets/lottie/upload-image.json';

const UploadImage = () => {
	return (
		<div className='imageKit__animationContainer'>
			<Lottie
				play
				loop
				animationData={UploadImageAnimationData}
				className='imageKit__animation'
			/>
			<p>Upload image to get started.</p>
		</div>
	);
};

export default UploadImage;
