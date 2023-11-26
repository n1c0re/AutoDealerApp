import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarCatalog from './components/CarCatalog/CarCatalog.jsx'
import CarDetails from './components/CarDetails/CarDetails.jsx'
import Header from './components/Header/Header.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import RegisterPage from './components/RegisterPage/RegisterPage.jsx'
import "./App.css"

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<CarCatalog />} />
						<Route path='/car/:carId' element={<CarDetails />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App