import React, { useEffect, useState } from 'react'
import './CarCatalog.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

function AdminCarCatalog() {
	const [cars, setCars] = useState([])
	const [newCar, setNewCar] = useState({
		car_brand_id: 1,
		body_type_id: 1,
		gear_type_id: 1,
		fuel_type_id: 1,
		equipment_type_id: 1,
		currency_id: 1,
	})
	const { loggedInUser } = useAuth()

	const [filledFields, setFilledFields] = useState({
		name: false,
		car_brand_id: false,
		price: false,
		currency_id: false,
		body_type_id: false,
		gear_type_id: false,
		engine_capacity: false,
		cylinder_count: false,
		engine_power: false,
		torque: false,
		max_speed: false,
		acceleration_time: false,
		production_date: false,
		length: false,
		width: false,
		height: false,
		track_fuel_consumption: false,
		city_fuel_consumption: false,
		fuel_type_id: false,
		equipment_type_id: false,
	})

	const navigate = useNavigate()

	async function handleAddCar() {
		try {
			await axios.post('http://localhost:4000/api/cars', newCar)
			getCars()
			// setCars(prevCars => [...prevCars, newCar])
		} catch (error) {
			console.error('Error:', error)
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target
		setNewCar(prevState => ({
			...prevState,
			[name]: value,
		}))
		setFilledFields(prevState => ({
			...prevState,
			[name]: value !== '',
		}))
		console.log(newCar)
	}

	function handleCarClick(carId) {
		navigate(`/car/${carId}`)
	}

	function areAllFieldsFilled() {
		return Object.values(filledFields).every(value => value)
	}

	function getFieldClass(fieldName) {
		return filledFields[fieldName] ? '' : 'field-not-filled'
	}

	const getCars = async () => {
		try {
			const response = await axios.get('http://localhost:4000/api/cars')
			setCars(response.data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		getCars()
	}, [])

	console.log(cars)

	return (
		<div className='car-catalog'>
			<form>
				<input
					type='text'
					name='name'
					onChange={handleInputChange}
					placeholder='Название'
					className={getFieldClass('name')}
				/>
				<select
					name='car_brand_id'
					className={getFieldClass('car_brand_id')}
					onChange={handleInputChange}
					value={newCar.car_brand_id || '1'}
				>
					<option value='1'>Франция</option>
					<option value='2'>Германия</option>
					<option value='3'>Швеция</option>
					<option value='4'>Россия</option>
					<option value='5'>Америка</option>
				</select>
				<input
					type='number'
					name='price'
					onChange={handleInputChange}
					placeholder='Стоимость'
					step='0.01'
					className={getFieldClass('price')}
				/>
				<select
					name='currency_id'
					className={getFieldClass('currency_id')}
					onChange={handleInputChange}
				>
					<option value='1'>USD</option>
					<option value='2'>EUR</option>
					<option value='3'>RUB</option>
					<option value='4'>BYN</option>
				</select>
				<select
					name='body_type_id'
					className={getFieldClass('body_type_id')}
					onChange={handleInputChange}
				>
					<option value='1'>Седан</option>
					<option value='2'>Хэтчбек</option>
					<option value='3'>Купе</option>
					<option value='4'>Лифтбэк</option>
					<option value='5'>Универсал</option>
				</select>
				<select
					name='gear_type_id'
					className={getFieldClass('gear_type_id')}
					onChange={handleInputChange}
				>
					<option value='1'>Автоматическая</option>
					<option value='2'>Механическая</option>
					<option value='3'>Вариатор</option>
				</select>
				<input
					type='number'
					name='engine_capacity'
					onChange={handleInputChange}
					placeholder='Объем двигателя'
					step='0.01'
					className={getFieldClass('engine_capacity')}
				/>
				<input
					type='number'
					name='cylinder_count'
					onChange={handleInputChange}
					placeholder='Количество цилиндров'
					step='1'
					className={getFieldClass('cylinder_count')}
				/>
				<input
					type='number'
					name='engine_power'
					onChange={handleInputChange}
					placeholder='Мощность двигателя'
					step='1'
					className={getFieldClass('engine_power')}
				/>
				<input
					type='number'
					name='torque'
					onChange={handleInputChange}
					placeholder='Крутящий момент'
					step='0.01'
					className={getFieldClass('torque')}
				/>
				<input
					type='number'
					name='max_speed'
					onChange={handleInputChange}
					placeholder='Максимальная скорость'
					step='1'
					className={getFieldClass('max_speed')}
				/>
				<input
					type='number'
					name='acceleration_time'
					onChange={handleInputChange}
					placeholder='Скорость разгона'
					step='0.01'
					className={getFieldClass('acceleration_time')}
				/>
				<input
					type='datetime-local'
					name='production_date'
					onChange={handleInputChange}
					placeholder='Дата производства'
					className={getFieldClass('production_date')}
				/>
				<input
					type='number'
					name='length'
					onChange={handleInputChange}
					placeholder='Длина'
					step='0.01'
					className={getFieldClass('length')}
				/>
				<input
					type='number'
					name='width'
					onChange={handleInputChange}
					placeholder='Ширина'
					step='0.01'
					className={getFieldClass('width')}
				/>
				<input
					type='number'
					name='height'
					onChange={handleInputChange}
					placeholder='Высота'
					step='0.01'
					className={getFieldClass('height')}
				/>
				<input
					type='number'
					name='track_fuel_consumption'
					onChange={handleInputChange}
					placeholder='Расход по трассе'
					step='0.01'
					className={getFieldClass('track_fuel_consumption')}
				/>
				<input
					type='number'
					name='city_fuel_consumption'
					onChange={handleInputChange}
					placeholder='Расход по городу'
					step='0.01'
					className={getFieldClass('city_fuel_consumption')}
				/>
				<select
					name='fuel_type_id'
					className={getFieldClass('fuel_type_id')}
					onChange={handleInputChange}
				>
					<option value='1'>Бензин</option>
					<option value='2'>Дизель</option>
					<option value='3'>Электричество</option>
					<option value='4'>Газ</option>
				</select>
				<select
					name='equipment_type_id'
					className={getFieldClass('equipment_type_id')}
					onChange={handleInputChange}
				>
					<option value='1'>Базовая</option>
					<option value='2'>Средняя</option>
					<option value='3'>Максимальная</option>
				</select>
			</form>
			<button onClick={handleAddCar} disabled={!areAllFieldsFilled()}>
				Добавить машину
			</button>
			{cars.map(car => (
				<div
					key={car.car_id}
					className='car-tile'
					onClick={() => handleCarClick(car.car_id)}
				>
					<h3>{car.name}</h3>
					<p>Производитель: {car.car_brand_id}</p>
					<p>Цена: ${car.price}</p>
				</div>
			))}
		</div>
	)
}

export default AdminCarCatalog
