/**
 * Use Desktop Only Component
 */

// Dependencies
import React from 'react';
import Lottie from 'react-lottie-player';
import './UseDesktopOnly.scss';

import useDesktopAnimationData from '../../assets/lottie/use-desktop.json';

const UseDesktopOnly = () => {
	// udo - use desktop only
	return (
		<div className='udo__container'>
			<Lottie
				loop
				animationData={useDesktopAnimationData}
				play
				className='udo__animation'
			/>
			<h1>Open Application in Laptop or Desktop.</h1>
		</div>
	);
};

export default UseDesktopOnly;
