/**
 * Home Page
 */

import React from 'react';
import './Home.scss';

import ImageKit from '../../components/home/ImageKit/ImageKit';
import DataControl from '../../components/home/DataControl/DataControl';

const Home = () => {
	return (
		<div className='home__container'>
			<ImageKit />
			<DataControl />
		</div>
	);
};

export default Home;
