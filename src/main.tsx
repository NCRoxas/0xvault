import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import GlobalProvider from "~/stores/globalSettings";
import BaseLayout from "~/components/layouts/BaseLayout";
import "./global.css";
import "virtual:windi.css";

const App = () => {
	return (
		<GlobalProvider>
			<Suspense fallback={<p>Loading...</p>}>
				<BaseLayout>{useRoutes(routes)}</BaseLayout>
			</Suspense>
		</GlobalProvider>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
);
