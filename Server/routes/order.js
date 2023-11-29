import express from 'express'
import startConnection from '../DataAccess/startConnection.js'

const orderRouter = express.Router()

const client = await startConnection()

orderRouter.post('/', async (req, res) => {
	const { seller_id, zakaz_date, zakaz_status } = req.body

	const query = `INSERT INTO Zakaz (seller_id, zakaz_date, zakaz_status) VALUES ($1, $2, $3) RETURNING zakaz_id`
	const values = [seller_id, zakaz_date, zakaz_status]

	try {
		const response = await client
			.query(query, values)
			.then(response => response.rows)

		const insertedZakazId = response[0].zakaz_id

		res.json({ success: true, zakaz_id: insertedZakazId })
	} catch (error) {
		console.error('Error:', error)
		res
			.status(500)
			.json({ success: false, error: 'Failed to create Zakaz record' })
	}
})

export default orderRouter
