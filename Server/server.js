import express from 'express'
import bodyParser from 'body-parser'
import pkg from 'pg'
import cors from 'cors'
import startConnection from './DataAccess/startConnection.js'
import jwt from 'jsonwebtoken'

const { Pool } = pkg

const app = express()
const port = process.env.SERVER_PORT || 4000

// Подключение к базе данных
const pool = new Pool({
	connectionString: 'your-database-connection-string',
})

app.use(cors())
app.use(bodyParser.json())

//Все машины
app.get('/api/cars', async (req, res) => {
	const client = await startConnection()

	const query = `SELECT * FROM Car`

	try {
		const response = await client.query(query).then(response => response.rows)
		res.send(response)
	} finally {
		client.release()
	}
})

//Отдельная машина
app.get('/api/cars/:carId', async (req, res) => {
	const { carId } = req.params
	console.log(carId)
	if (!Number.isInteger(parseInt(carId))) {
		return res.status(400).send({ error: 'Invalid carId' })
	}

	const client = await startConnection()

	const query = `SELECT
	Car.car_id,
    Car.engine_capacity,
    Car.cylinder_count,
    Car.engine_power,
    Car.torque,
    Car.max_speed,
    Car.acceleration_time,
    Car.production_date,
    Car.price,
	Currency.currency,
    Car.length,
    Car.width,
    Car.height,
    Car.track_fuel_consumption,
    Car.city_fuel_consumption,
    GearType.gear_type,
    BodyType.body_type,
    FuelType.fuel_type,
    CarBrand.carbrand,
    EquipmentType.equipment_type,
    Car.name
FROM
    Car
JOIN
    GearType ON Car.gear_type_id = GearType.gear_type_id
JOIN
    BodyType ON Car.body_type_id = BodyType.body_type_id
JOIN
    Currency ON Car.currency_id = Currency.currency_id
JOIN
    FuelType ON Car.fuel_type_id = FuelType.fuel_type_id
JOIN
    CarBrand ON Car.car_brand_id = CarBrand.car_brand_id
JOIN
    EquipmentType ON Car.equipment_type_id = EquipmentType.equipment_type_id
WHERE car_id = $1;`

	const values = [carId]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows[0])

		if (response) {
			res.send(response)
		} else {
			res.status(404).send({ error: 'Car not found' })
		}
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send({ error: 'Internal Server Error' })
	} finally {
		client.release()
	}
})

//Добавление машины
app.post('/api/cars', async (req, res) => {
	const {
		engine_capacity,
		cylinder_count,
		engine_power,
		torque,
		max_speed,
		acceleration_time,
		production_date,
		price,
		currency_id,
		length,
		width,
		height,
		track_fuel_consumption,
		city_fuel_consumption,
		gear_type_id,
		fuel_type_id,
		body_type_id,
		car_brand_id,
		equipment_type_id,
		name,
	} = req.body

	console.log(req.body)
	const client = await startConnection()

	const query = `INSERT INTO Car (engine_capacity, cylinder_count, engine_power, torque, max_speed, acceleration_time, production_date, price, currency_id, length, width, height, track_fuel_consumption, city_fuel_consumption, gear_type_id, fuel_type_id, body_type_id, car_brand_id, equipment_type_id, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`
	const values = [
		engine_capacity,
		cylinder_count,
		engine_power,
		torque,
		max_speed,
		acceleration_time,
		production_date,
		price,
		currency_id,
		length,
		width,
		height,
		track_fuel_consumption,
		city_fuel_consumption,
		gear_type_id,
		fuel_type_id,
		body_type_id,
		car_brand_id,
		equipment_type_id,
		name,
	]

	console.log(values)

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		console.log(response)
		return response
	} finally {
		client.release()
	}
})

//Регистрация
app.post('/api/users', async (req, res) => {
	console.log(req.body)
	const client = await startConnection()

	const query = `INSERT INTO Users (login, is_legal_entity, password, user_name, user_type) VALUES ($1, $2, $3, $4, 'Пользователь')`
	const values = [
		req.body['login'],
		req.body['entity'],
		req.body['password'],
		req.body['username'],
	]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)
		return response
	} finally {
		client.release()
	}
})

//Проверка логина
app.get('/api/users/:login', async (req, res) => {
	const { login } = req.params

	try {
		const client = await startConnection()
		const result = await client.query(
			'SELECT EXISTS (SELECT 1 FROM Users WHERE login = $1) as "exists"',
			[login]
		)
		const exists = result.rows[0].exists

		res.json({ exists })
		client.release()
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send('Server Error')
	}
})

//Вход пользователя
app.post('/api/login', async (req, res) => {
	const { login, password } = req.body

	console.log(req.body)
	const client = await startConnection()

	const query = `SELECT * FROM Users WHERE login = $1 AND password = $2`
	const values = [login, password]

	console.log(values)
	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)

		if (response.length > 0) {
			const token = jwt.sign(
				{
					userId: response[0].user_id,
					user_name: response[0].user_name,
					user_type: response[0].user_type,
				},
				'your_secret_key',
				{ expiresIn: '1h' }
			)

			res.json({ success: true, message: 'Вход выполнен успешно', token })
		} else {
			res.status(401).json({
				success: false,
				message: 'Ошибка входа. Проверьте логин и пароль.',
			})
		}
	} finally {
		client.release()
	}
})

//Проверка токена
app.post('/api/validateToken', async (req, res) => {
	const { token } = req.body

	try {
		const decoded = jwt.verify(token, 'your_secret_key')
		console.log(decoded)

		res.json({ user: decoded })
	} catch (error) {
		console.error('Ошибка при проверке токена:', error)
		res.status(401).send('Invalid token')
	}
})

//Удаление машины
app.delete('/api/cars/:carId', async (req, res) => {
	const { carId } = req.params
	console.log(carId)
	if (!Number.isInteger(parseInt(carId))) {
		return res.status(400).send({ error: 'Invalid carId' })
	}

	const client = await startConnection()

	const query = `DELETE FROM Car WHERE car_id = $1;`

	const values = [carId]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows[0])

		if (response) {
			res.send(response)
		} else {
			res.status(404).send({ error: 'Car not found' })
		}
	} catch (error) {
		console.error('Error:', error)
		res.status(500).send({ error: 'Internal Server Error' })
	} finally {
		client.release()
	}
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
