import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Settings from './pages/Settings.js';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
