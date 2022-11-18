/**
 * Uploading Image Error Component
 */

// Dependencies
import React from 'react';
import Lottie from 'react-lottie-player';

import UploadingErrorAnimationData from '../../../assets/lottie/upload-error.json';

const UploadingImage = () => {
	return (
		<div className='imageKit__animationContainer'>
			<Lottie
				play
				loop
				animationData={UploadingErrorAnimationData}
				className='imageKit__animation'
			/>
			<p>Unable to Upload Image. Try again.</p>
		</div>
	);
};

export default UploadingImage;
