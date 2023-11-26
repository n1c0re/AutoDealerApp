import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
	return (
		<header>
			<Link to='/'>
				<div className='home-icon'>🏠</div>
			</Link>
			<h1>Дилер по продаже автомобилей</h1>
			<div className='auth-buttons'>
				<Link to='/login'>
					<button>Войти</button>
				</Link>
				<Link to='/register'>
					<button>Зарегистрироваться</button>
				</Link>
			</div>
		</header>
	)
}

export default Header

