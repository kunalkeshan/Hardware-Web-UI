/**
 * Application
 */

// Dependencies
import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.scss';

import AppRoutes from './routes/AppRoutes';
import Loading from './components/layouts/Loading/Loading';
import Navbar from './components/layouts/Navbar/Navbar';
import UseDesktopOnly from './components/UseDesktopOnly/UseDesktopOnly';
import Backdrop from './components/layouts/Backdrop/Backdrop';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		});
		return () => window.removeEventListener('resize', () => {});
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (loading) setLoading(false);
		}, 5000);
		return () => clearTimeout(timeoutId);
	}, [loading]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const loadingHistory = sessionStorage.getItem('loadingHistory-v1')
				? JSON.parse(
						sessionStorage.getItem('loadingHistory-v1') || '{}'
				  )
				: {
						lastLoaded: Date.now(),
				  };
			if (!loadingHistory) {
				sessionStorage.setItem(
					'loadingHistory-v1',
					JSON.stringify(loadingHistory)
				);
			}
			if (Date.now() - loadingHistory.lastLoaded > 1000 * 60 * 60 * 2)
				setLoading(true);
		}, 1000 * 60 * 30);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='App'>
			{loading ? (
				<Loading />
			) : (
				<main>
					{windowSize.width <= 800 || windowSize.height <= 600 ? (
						<UseDesktopOnly />
					) : (
						<HashRouter>
							<Navbar />
							<AppRoutes />
							<Backdrop />
							<Toaster position='bottom-right' />
						</HashRouter>
					)}
				</main>
			)}
		</div>
	);
}

export default App;
