import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"

import FormModifSpot from "./modif/FormModifSpot"
import MapFranceReg from "./country/france/region/FranceReg"
import createTheme from "@mui/material/styles/createTheme"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import CssBaseline from "@mui/material/CssBaseline/CssBaseline"

import "./App.css"
import "./svgMapGlobal.css"

function App() {
	const routes = [
		{
			name: "france-region",
			path: "/france/region",
			component: <MapFranceReg />,
		},
		{
			name: "index",
			path: "/admin",
			component: <FormModifSpot />,
			// 'roles': ['ROLE_USER'],
		},
	]

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			background: {
				default: "rgb(10, 25, 41)",
				paper: "rgb(10, 25, 41)",
			},
		},
	})

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className="App">
				<BrowserRouter>
					<Routes>
						{routes.map((route, index) => {
							return (
								<Route
									path={route.path}
									element={route.component}
									key={index}
								/>
							)
						})}
					</Routes>
					{/*  <Route component={NotFound} /> */}
				</BrowserRouter>
			</div>
		</ThemeProvider>
	)
}

export default App
