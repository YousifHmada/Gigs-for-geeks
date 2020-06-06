import React from "react";
import "./App.css";
import JobsTable from "./components/JobsTable";
import FlashMessage from "./components/FlashMessage";
import GlovalProvider from "./core/GlobalProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<GlovalProvider className="app-container">
			<JobsTable />
			<FlashMessage />
		</GlovalProvider>
	);
}

export default App;
