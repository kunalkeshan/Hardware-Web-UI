/**
 * Get Animation CTA
 */

// Dependencies
import React, { FC } from 'react';
import Lottie from 'react-lottie-player';

import GetPredictionAnimationData from '../../../assets/lottie/get-prediction.json';

interface GetAnimationDataProps {
	text: string;
}

const GetAnimationData: FC<GetAnimationDataProps> = ({ text }) => {
	return (
		<div className='dataControl__getDataContainer'>
			<Lottie
				animationData={GetPredictionAnimationData}
				play
				loop
				className='dataControl__getDataAnimation'
			/>
			<p>{text}</p>
		</div>
	);
};

export default GetAnimationData;
