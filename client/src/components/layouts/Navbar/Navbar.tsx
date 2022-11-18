/**
 * Navbar Component
 */

// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

import SRMISTLogo from '../../../assets/srmist-logo.png';
import NexusLogo from '../../../assets/nexus-logo.png';

const Navbar = () => {
	return (
		<nav>
			<div className='app__container'>
				<div>
					<Link to={'/'}>
						<img
							src={SRMISTLogo}
							alt='SRMIST Logo'
							className='nav__logo'
						/>
					</Link>
					<Link to={'/'}>
						<img
							src={NexusLogo}
							alt='Nexus Logo'
							className='nav__logo'
						/>
					</Link>
				</div>
				<div className='nav__text'>
					<h1>Women in Tech</h1>
					<h6>
						A graphical user interface (GUI) that is built on the
						Web and used to communicate with the Breast Cancer
						Detection Neural Network.
					</h6>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
