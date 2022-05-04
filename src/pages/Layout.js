import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';

const Layout = () => {
	return (
		<div className="background">
			<TopBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
