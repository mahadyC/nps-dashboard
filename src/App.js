import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Embed from './pages/Embed.js';
import NotFound from './pages/NotFound';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="embed-survey" element={<Embed />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
