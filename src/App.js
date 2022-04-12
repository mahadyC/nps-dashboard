import "./App.css";
import Sidebar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import Home from "./components/pages/home/Home";

function App() {
	return (
		<div>
			<TopBar />
			<div className="container">
				<Sidebar />
				<Home />
			</div>
		</div>
	);
}

export default App;
