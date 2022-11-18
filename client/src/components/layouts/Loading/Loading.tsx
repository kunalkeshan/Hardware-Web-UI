/**
 * Landing Page Loading Component
 */

// Dependencies
import React, { useState, useEffect } from 'react';
import BrainGif from '../../../assets/brain-mind-nobg.gif';
import './Loading.scss';

const Loading = () => {
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setProgress((prev) => (prev += 1));
		}, 40); // 1% = 40ms, rest 1000ms is given to fade animation
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className={`container ${progress > 100 ? 'fade' : ''}`}>
			<img src={BrainGif} alt='Brain Gif' />
			<progress value={progress} max={'100'} className='loading-progress'>
				{progress}
			</progress>
			<p className='loading-text'>Loading Web UI...</p>
		</div>
	);
};

export default Loading;
