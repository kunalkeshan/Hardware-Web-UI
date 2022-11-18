/**
 * Uploading Image Component
 */

// Dependencies
import React from 'react';
import Lottie from 'react-lottie-player';

import UploadingImageAnimationData from '../../../assets/lottie/uploading.json';

const UploadingImage = () => {
	return (
		<div className='imageKit__animationContainer'>
			<Lottie
				play
				loop
				animationData={UploadingImageAnimationData}
				className='imageKit__animation'
			/>
			<p>Image being uploaded. Might take some time.</p>
		</div>
	);
};

export default UploadingImage;
