import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../topBar/TopBar";

const Layout = () => {
	return (
		<div>
			<TopBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
