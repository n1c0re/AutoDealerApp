import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import Header from '../Header/Header'
import UserCarCatalog from '../CarCatalog/UserCarCatalog'
import AdminCarCatalog from '../CarCatalog/AdminCarCatalog'
import CarDetails from '../CarDetails/CarDetails'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

function AppContent() {
	const { loggedInUser } = useContext(AuthContext)
	console.log(loggedInUser)

	if (loggedInUser) {
		if (loggedInUser.user_type === 'Пользователь') {
			return (
				<BrowserRouter>
					<div className='App'>
						<Routes>
							<Route path='/car/:carId' element={<Header />} />
							<Route path='/dashboard' element={<Header />} />
						</Routes>
						<div className='content'>
							<Routes>
								<Route
									path='/register'
									element={<Navigate to='/dashboard' />}
								/>
								<Route path='/' element={<Navigate to='/dashboard' />} />
								<Route path='/car/:carId' element={<CarDetails />} />
								<Route path='/dashboard' element={<UserCarCatalog />} />
								<Route path='*' element={<NotFoundPage />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			)
		} else if (loggedInUser.user_type === 'Админ') {
			return (
				<BrowserRouter>
					<div className='App'>
						<Routes>
							<Route path='/car/:carId' element={<Header />} />
							<Route path='/dashboard' element={<Header />} />
						</Routes>
						<div className='content'>
							<Routes>
								<Route
									path='/register'
									element={<Navigate to='/dashboard' />}
								/>
								<Route path='/' element={<Navigate to='/dashboard' />} />
								<Route path='/car/:carId' element={<CarDetails />} />
								<Route path='/dashboard' element={<AdminCarCatalog />} />
								<Route path='*' element={<NotFoundPage />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			)
		}
	} else
		return (
			<BrowserRouter>
				<div className='App'>
					<Routes>
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/' element={<LoginPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		)
}

export default AppContent
