import React, { useEffect, useState } from 'react'
import './CarCatalog.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

function UserCarCatalog() {
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

export default UserCarCatalog
