import "./App.css";
// import Sidebar from "./components/sideBar/SideBar";
import Home from "./components/pages/home/Home";
import Layout from "./components/layout/Layout";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Responses from "./components/pages/responses/Responses.js";
import Settings from "./components/settings/Settings.js";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* <Route index element={<Home />} /> */}
					{/* <Route path="Responses" element={<Responses />} /> */}
					<Route path="Dashboard" element={<Home />} />
					<Route path="Settings" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
