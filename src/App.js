import "./App.css";
// import Sidebar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import Home from "./components/pages/home/Home";
import Layout from "./components/layout/Layout";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Responses from "./components/responses/Responses";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="Responses" element={<Responses />} />
					{/* <Sidebar /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
