/**
 * Backdrop Container
 */

// Dependencies
import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import './Backdrop.scss';

const Backdrop = () => {
	const [loading] = useAppSelector((state) => [state.app.loading]);
	return (
		<div
			className='backdrop__container'
			style={{ display: loading ? 'block' : 'none' }}
		>
			<svg className='spinner' viewBox='0 0 50 50'>
				<circle
					className='path'
					cx='25'
					cy='25'
					r='20'
					fill='none'
					strokeWidth='5'
				></circle>
			</svg>
		</div>
	);
};

export default Backdrop;
