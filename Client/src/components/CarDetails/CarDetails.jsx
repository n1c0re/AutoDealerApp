import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function CarDetails() {
	const { carId } = useParams()
	const [carDetails, setCarDetails] = useState(null)
	let currency

	useEffect(() => {
		const fetchCarDetails = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/api/cars/${carId}`
				)
				setCarDetails(response.data)
			} catch (error) {
				console.error('Error:', error)
			}
		}

		fetchCarDetails()
	}, [carId])

	if (!carDetails) {
		return <div>Loading...</div>
	}

	console.log(carDetails.currency)

	switch (carDetails.currency) {
		case 'RUB': {
			currency = <p>Стоимость: {carDetails.price}&#8381;</p>
			break
		}
		case 'USD': {
			currency = <p>Стоимость: {carDetails.price}&#36;</p>
			break
		}
		case 'EUR': {
			currency = <p>Стоимость: {carDetails.price}&#8364;</p>
			break
		}
		case 'BYN': {
			currency = <p>Стоимость: {carDetails.price}BYN</p>
			break
		}
	}

	async function handleDeleteCar() {
		try {
			await axios.delete(`http://localhost:4000/api/cars/${carId}`)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div>
			<h2>{carDetails.name}</h2>
			<p>Производитель: {carDetails.carbrand}</p>
			{currency}
			<p>Тип кузова: {carDetails.body_type}</p>
			<p>Коробка передач: {carDetails.gear_type}</p>
			<p>Объем двигателя: {carDetails.engine_capacity}л</p>
			<p>Количество цилиндров: {carDetails.cylinder_count}</p>
			<p>Мощность двигателя: {carDetails.engine_power}</p>
			<p>Крутящий момент: {carDetails.torque}</p>
			<p>Максимальная скорость: {carDetails.max_speed}</p>
			<p>Время разгона(0-100 км/ч): {carDetails.acceleration_time}</p>
			<p>Дата производства: {carDetails.production_date}</p>
			<p>Длина: {carDetails.length}м</p>
			<p>Ширина: {carDetails.width}м</p>
			<p>Высота: {carDetails.height}м</p>
			<p>Расход по трассе: {carDetails.track_fuel_consumption}л</p>
			<p>Расход по городу: {carDetails.city_fuel_consumption}л</p>
			<p>Топливо: {carDetails.fuel_type}</p>
			<p>Комплектация: {carDetails.equipment_type}</p>
			<Link to='/dashboard'>
				<button onClick={handleDeleteCar}>Удалить машину</button>
			</Link>
		</div>
	)
}

export default CarDetails
